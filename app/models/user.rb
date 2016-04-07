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
  has_many :certifiables
  has_many :certificates, through: :certifiables
  has_many :attachments, dependent: :destroy

  default_scope { order :name }



  validates :name, uniqueness: true, presence: true, length: {maximum: 64}
  validates :phone, format:{with:/\d{10}/, message:"It must be a valid phone number"}, 
  length: {maximum: 10}, if: "phone.present?"
  validates :email,length: {maximum: 64}, format:{with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/},
  if: "email.present?"

  
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
    Day = Struct.new :date, :active, :available

    def initialize(appointments)
      @available_dates = appointments.map &:date
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
        available = @available_dates.include?(date)
        days << Day.new(date, true, available)
      end

      append.times do |i|
        i = i + 1
        days << Day.new(later + i.days)
      end

      days
    end
  end
end
