class Label < ActiveRecord::Base
  belongs_to :user
  belongs_to :role
  belongs_to :job
  belongs_to :department 

  scope :search_by_role, ->(params){ Label.where role_id: params}


end