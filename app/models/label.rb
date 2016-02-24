class Label < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  belongs_to :job
  belongs_to :department 

  scope :search_by_category, ->(params){ Label.where category_id: params}


end