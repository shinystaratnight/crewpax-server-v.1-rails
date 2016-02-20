class Category < ActiveRecord::Base
  has_many :labels
  has_many :users, through: :labels
  has_many :categories, through: :labels



end
