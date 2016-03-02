class Address < ActiveRecord::Base
  belongs_to :user
  #Active Record Models can inherit from a table through the attribute :type, 
  #setting the inheritance_column to nil removes that attribute allowing you 
  #to have a database column named type
  self.inheritance_column = nil 
end