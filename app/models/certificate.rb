class Certificate < ActiveRecord::Base
  has_many :certifiables, dependent: :destroy
  has_many :user, through: :certifiables

end