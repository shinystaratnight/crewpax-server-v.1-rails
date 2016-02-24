class Role < ActiveRecord::Base
  has_many :labels
  has_many :users, through: :labels
  has_many :jobs, through: :labels
 
end
