class AddFiveHundredMoreUsers < ActiveRecord::Migration
  def up
    500.times do |i|
      User.create(email: "new##{i+335}@sample.net", name: "##{i+335}shley", admin: false)
    end
  end
end
