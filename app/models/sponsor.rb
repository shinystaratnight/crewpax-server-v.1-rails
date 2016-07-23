class Sponsor < ActiveRecord::Base
  mount_uploader :picture, SponsorUploader
  validates :picture, presence: true, on: :create
end