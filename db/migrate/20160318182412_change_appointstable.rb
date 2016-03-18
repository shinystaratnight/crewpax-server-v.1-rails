class ChangeAppointstable < ActiveRecord::Migration
  def change
    change_table :appointments do |t|
      t.boolean :availability
      t.string :day 
    end
  end
end
