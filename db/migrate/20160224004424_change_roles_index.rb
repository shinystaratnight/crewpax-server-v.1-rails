class ChangeRolesIndex < ActiveRecord::Migration
  def change
    change_table :labels do |t|
      t.remove :category_id
      
    end
    add_reference :labels, :role, index:true
    # change_table :jobs do |t|
    #   t.remove :category_id
    #   t.references :roles, index:true, foreign_key:true
    # end

    # change_table :users do |t|
    #   t.remove :category_ids
    #   t.string :roles_ids, default: [], array:true
    # end
  end
end
