class User < ActiveRecord::Base
  
  #Include default devise modules. Others are available are:
  #:token_authenticatable, :lockable, :trackable :timeoutable and :activatable
  devise :database_authenticatable, :registerable, :omniauthable, :recoverable, :rememberable,
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

  default_scope { order :last_sign_in_at }
  


  validates :name, uniqueness: true, presence: true, length: {maximum: 64}
  validates :phone, format:{with:/\d{10}/, message:"It must be a valid phone number"}, 
  length: {maximum: 10}, if: "phone.present?"
  validates :email,length: {maximum: 64}, format:{with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/},
  if: "email.present?"

  
  
  # def self.sort_user(sort_order)
  #   if sort_order == "most_recent"
  #     reorder(last_sign_in_at: :desc)
  #   else 
  #     reorder(name: :asc)
  #   end
  # end


  def self.from_omniauth(auth)
    user_credentails = User.find_by(email:auth.info.email)
    binding.pry 
    if user_credentails.present?
      user_credentails.update_attributes(uid: auth.uid)
      user = user_credentails
    else
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        # user.password = Devise.friendly_token[0,20]
        user.name = auth.info.name
        user.image = auth.info.image
      end
    end
  end




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
  def start_date   
    Date.today
  end
  
  def date_range(start_date)   
    (start_date.to_date.beginning_of_month.beginning_of_week..start_date.to_date.end_of_month.end_of_week).to_a
  end

  def td_classes_for(day, appointments)
   
    today = Time.zone.now.to_date
    
    td_class = ["day"]
    td_class << "wday-#{day.wday.to_s}"
    td_class << "today"         if today == day
    td_class << "past"          if today > day
    td_class << "future"        if today < day
    td_class << 'start-date'    if day.to_date == start_date.to_date
    td_class << "prev-month"    if start_date.month != day.month && day < start_date
    td_class << "next-month"    if start_date.month != day.month && day > start_date
    td_class << "current-month" if start_date.month == day.month
  
  
    if appointments.include?(day)
      td_class << "available"
    else
      td_class << "unavailable"
    end

    td_class
  end


end
