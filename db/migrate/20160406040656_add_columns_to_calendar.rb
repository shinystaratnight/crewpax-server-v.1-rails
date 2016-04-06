class AddColumnsToCalendar < ActiveRecord::Migration
  def change
    add_column :appointments, :week, :string
    add_column :appointments, :date, :date
  end
end
