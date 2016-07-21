class Sponsor < ActiveRecord::Base
  mount_uploader :picture, SponsorUploader

end