class Attachment < ActiveRecord::Base
  belongs_to :user
  #Active Record Models can inherit from a table through the attribute :type, 
  #setting the inheritance_column to nil removes that attribute allowing you 
  #to have a database column named type
  self.inheritance_column = nil 
  mount_uploader :file, AttachmentUploader
  validates :client_email, presence:true, length: {maximum: 64}, format:{with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/},
  if: "client_email.present?"
end