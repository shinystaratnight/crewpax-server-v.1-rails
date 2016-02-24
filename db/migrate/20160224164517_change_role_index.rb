class ChangeRoleIndex < ActiveRecord::Migration
  def change
    remove_index :jobs, column: :category_id
    add_reference :jobs, :role, index: true
    change_table :users do |t|
      t.remove :category_ids
      t.string :roles_ids, default: [], array:true
    end
  end
end
