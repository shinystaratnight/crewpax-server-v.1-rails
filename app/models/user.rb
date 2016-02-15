class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  mount_uploader :image, ImageUploader

  has_many :appointments, dependent: :destroy

  default_scope { order :name }

  validates :name, presence: true

  def calendar
    Calendar.new appointments
  end

  class Calendar
    Day = Struct.new :date, :active, :unavailable

    def initialize(appointments)
      @unavailable_dates = appointments.map &:date
      @days = days
    end

    def weeks
      days.in_groups_of 7
    end

    def days
      days = []

      today = Date.current
      later = today + 13.days

      prepend = today.wday
      append  = 6 - later.wday

      prepend.times do |i|
        days << Day.new(today - (prepend - i).days)
      end

      (today..later).each do |date|
        unavailable = @unavailable_dates.include?(date)
        days << Day.new(date, true, unavailable)
      end

      append.times do |i|
        i = i + 1
        days << Day.new(later + i.days)
      end

      days
    end
  end
end
