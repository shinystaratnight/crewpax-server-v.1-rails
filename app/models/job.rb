class Job < ActiveRecord::Base
  default_scope { order updated_at: :desc }
  scope :published, -> { where published: true }
  scope :by_role, ->(role) { where role_id: role.id }

  validates :name, :role_id, :description, :company_name, :starts_on, :ends_on, :location, :contact_name, :contact_phone, :contact_email, presence: true
  validates :contact_email, format: { with: /@/ }
  
  before_create { self.secret = SecureRandom.urlsafe_base64 }
# After a job posting is created, job_id is added to labels table.
  after_create :add_job_label, only:[:create]
# After a job posting is removed, job_id is removed from labels table.
  after_destroy :delete_job_label, only:[:destroy]
  
  
  has_many :roles, through: :labels
  has_many :labels
  belongs_to :user

  def role
    Role.find role_id
  end

  def add_job_label
    @job = self
    @label = @job.labels.create!(role_id:@job.role_id)  
  end
  
  def delete_job_label
    @job=self
    Label.find_by(job_id: @job.id).destroy!
  end

end
