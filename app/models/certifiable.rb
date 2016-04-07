class Certifiable < ActiveRecord::Base
  belongs_to :user
  belongs_to :certificate 

end