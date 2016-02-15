class Appointment < ActiveRecord::Base
  belongs_to :user

  default_scope { where('date >= ?', Date.current) }
end
