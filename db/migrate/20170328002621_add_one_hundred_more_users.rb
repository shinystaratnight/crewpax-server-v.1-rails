class AddOneHundredMoreUsers < ActiveRecord::Migration
  def up
    100.times do |i|
      User.create(email: "new##{i+235}@sample.net", name: "##{i+235}shley", admin: false)
    end
  end
end
