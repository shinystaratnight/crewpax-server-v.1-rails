class Job < ActiveRecord::Base
  default_scope { order updated_at: :desc }
  scope :published, -> { where published: true }

  validates :name, :role_id, :company_name, :starts_on, :location, :contact_name, :contact_phone, :contact_email, presence: true
  validates :contact_email, format: { with: /@/ }
  
  before_create { self.secret = SecureRandom.urlsafe_base64 }

  
  
  has_many :roles, through: :labels
  has_many :labels
  belongs_to :user

  def role
    Role.find role_id
  end


  def self.find_most_recent(update_date)
    if update_date == "most_recent"
      reorder(updated_at: :desc)
    else 
      reorder(name: :asc)
    end
  end

end
