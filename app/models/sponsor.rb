class Sponsor < ActiveRecord::Base
  mount_uploader :picture, SponsorUploader
  validates :name, presence: true, length: {maximum: 64}, on: :update
  validates :picture, presence: true
  validates :website_url, presence:true, on: :update
end