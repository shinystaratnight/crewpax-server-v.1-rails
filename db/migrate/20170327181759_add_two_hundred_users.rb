class AddTwoHundredUsers < ActiveRecord::Migration
  def up
    200.times do |i|
      User.create(email: "new##{i+35}@sample.net", name: "##{i+35}shley", admin: false)
    end
  end
end