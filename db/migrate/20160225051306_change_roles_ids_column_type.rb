class ChangeRolesIdsColumnType < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.remove :roles_ids
      t.integer :roles_ids, default:[], array:true
    end
    
  end
end
