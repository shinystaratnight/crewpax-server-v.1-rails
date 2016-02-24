class CreateEligibilitiesTable < ActiveRecord::Migration
  def change
    create_table :eligibilities do |t|
      t.boolean :member
      t.integer :permit_days
      t.references :user, index: true, foreign_key: true
      t.references :union, index: true, foreign_key: true
      t.references :role, index:true, foreign_key:true 
    end
  end
end
