class Role < ActiveRecord::Base
  has_many :labels
  has_many :users, through: :labels
  has_many :jobs, through: :labels
  has_many :eligibilities, dependent: :destroy
  has_many :users, through: :eligibilities
  has_many :unions, through: :eligibilities
 
end
