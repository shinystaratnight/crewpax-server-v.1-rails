class Certificate < ActiveRecord::Base
  has_many :certifiables
  has_many :user, through: :certifiables

end