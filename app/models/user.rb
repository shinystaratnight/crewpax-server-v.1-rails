class User < ActiveRecord::Base
  #Include default devise modules. Others are available are:
  #:token_authenticatable, :lockable, :trackable :timeoutable and :activatable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
         :trackable
  mount_uploader :image, ImageUploader
  #comment out devise :validatable
  has_many :appointments, dependent: :destroy
  has_many :labels
  has_many :jobs
  has_many :roles, through: :labels
  has_many :eligibilities
  has_many :unions, through: :eligibilities
  has_many :addresses, dependent: :destroy
  accepts_nested_attributes_for :addresses

  default_scope { order :name }

  # validates :name, presence: true, uniqueness: true

  
  #scope :search_by_role, ->(params){ Label.where roles_ids: params}
  # , ->(role) { where {role_ids: include role.id} }

  # def self.search_by_role(params)
  #   #selected_role_ids = params.split().map(&:to_i)
  #     User.all.map do |user| 
  #       user.labels.all.map do |l|
            
  #         if l.role_id==params
            
  #           @user = User.find(l.user_id) 
  #           @users =[]
  #           @users << @user
  #         end
  #       end
  #     end 
  # end


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
