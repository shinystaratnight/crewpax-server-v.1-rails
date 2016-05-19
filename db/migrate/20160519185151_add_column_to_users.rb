class AddColumnToUsers < ActiveRecord::Migration
  def change
        add_column :users, :is_iatse_member, :boolean, default:false
  end
end
