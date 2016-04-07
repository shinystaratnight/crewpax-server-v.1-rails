class ChangeAppointstable < ActiveRecord::Migration
  def change
    change_table :appointments do |t|
      t.remove :date
      t.string :day 
    end
  end
end
