class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.date     "date"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    add_reference :appointments, :user, index:true
  end
end
