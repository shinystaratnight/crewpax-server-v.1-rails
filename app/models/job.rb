class Job < ActiveRecord::Base
  default_scope { order updated_at: :desc }
  scope :published, -> { where published: true }

  validates :name, :category_id, :description, :company_name, :starts_on, :ends_on, :location, :contact_name, :contact_phone, :contact_email, presence: true
  validates :contact_email, format: { with: /@/ }
  
  before_create { self.secret = SecureRandom.urlsafe_base64 }

  has_many :categories, as: :categorized

  def category
    Category.find category_id
  end
end
