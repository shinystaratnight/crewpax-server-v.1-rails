class User < ActiveRecord::Base

  #Include default devise modules. Others are available are:
  #:token_authenticatable, :lockable, :trackable :timeoutable and :activatable
  devise :database_authenticatable, :registerable, :omniauthable, :recoverable, :rememberable,
         :trackable

  mount_uploader :image, ImageUploader
  #comment out devise :validatable
  has_many :appointments, dependent: :destroy
  has_many :labels, dependent: :destroy
  has_many :jobs
  has_many :roles, through: :labels
  has_many :eligibilities, dependent: :destroy
  has_many :unions, through: :eligibilities
  has_many :addresses, dependent: :destroy
  has_many :certifiables, dependent: :destroy
  has_many :certificates, through: :certifiables
  has_many :attachments, dependent: :destroy
  has_many :messages

  default_scope { order :last_sign_in_at }

  validates :name, uniqueness: true, presence: true, length: {maximum: 64}
  validates :phone, format:{with:/\d{10}/, message:" must be a 10 digit number"},
  length: {maximum: 10}, if: "phone.present?"
  validates :email, uniqueness: true, length: {maximum: 64}, format:{with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/, message:" must be a valid email address"},
  if: "email.present?"
  validates :password, length: {minimum: 4}, if: "reset_password_token.present?"

  # by default, Devise only adds the validates_confirmation_of
  #:password on the 'User' model (or any other model you chose as the authentication model)
  #in the case of a :create. When updating we are of course editing rather than creating.

  validates_confirmation_of :password, if: "reset_password_token.present?"

  def self.from_omniauth(auth)
    user_credentials = User.find_by(email:auth.info.email)
    #First time users with credentails log in with facebook
    if user_credentials.present? && user_credentials.uid == nil
      user_credentials.update_attributes(uid: auth.uid)
      user = user_credentials
      # users with credentails have updated their facebook id in their database
      # and checking the reponse facebook id from fb api is the same as the one in database
      if user_credentials.uid.present? && auth.uid == user_credentials.uid
        user = user_credentials
      end
    else
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.name = auth.info.name
        user.remote_image_url = auth.info.image
      end
    end

  end


  def start_date
    Date.today
  end

  def date_range(start_date)
    (start_date.to_date.beginning_of_month.beginning_of_week..start_date.to_date.end_of_month.end_of_week).to_a
  end

  # def date_range_two(start_date)
  #   (start_date.to_date.beginning_of_week..start_date.to_date.end_of_week + 7.day).to_a
  # end

  def tw_start_date
    Date.today
  end

  def tw_date_range(tw_start_date)
    (tw_start_date.beginning_of_week..tw_start_date.end_of_week + 7.day).to_a
  end

  def td_classes_for(day, appointments)

    today = Time.zone.now.to_date

    td_class = ["day profile-day"]
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
