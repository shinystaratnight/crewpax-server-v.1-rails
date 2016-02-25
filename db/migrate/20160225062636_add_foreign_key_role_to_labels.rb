class AddForeignKeyRoleToLabels < ActiveRecord::Migration
  def change
    add_foreign_key :labels, :roles
  end
end
