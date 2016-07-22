class Sponsor < ActiveRecord::Base
  mount_uploader :picture, SponsorUploader
  validates :name, presence: true, length: {maximum: 64}
  validates :picture, presence: true
  validates :website_url, presence:true
end