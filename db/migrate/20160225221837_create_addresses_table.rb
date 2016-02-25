class CreateAddressesTable < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :type
      t.string :address_input
      t.references :user, index:true, foreign_key:true
    end
  end
end
