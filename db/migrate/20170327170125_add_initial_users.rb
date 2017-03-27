class AddInitialUsers < ActiveRecord::Migration
  def up
    35.times do |i|
      User.create(email: "new##{i}@sample.net", name: "##{i}shley", admin: false)
    end
  end
end
