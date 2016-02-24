class Union< ActiveRecord::Base
  has_many :eligibilities
  has_many :users, through: :eligibilities
  has_many :roles, through: :eligibilities
end
