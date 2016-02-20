class Label < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  belongs_to :job

  scope :search_by_category, ->(params){ Label.where category_id: params}

# After a job is created, the association between label and job needs to be added.
# the information of the job needs to be passed in as a param
  # def add_job_label(params)
  #   @job = Job.find(params)
  #   @label = @job.labels.create
  #   @label.save
  # end

end