class Label < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  belongs_to :job

  scope :search_by_category, ->(params){ Label.where category_id: params}

end