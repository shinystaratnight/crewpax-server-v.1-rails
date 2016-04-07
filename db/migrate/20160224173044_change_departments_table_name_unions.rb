class ChangeDepartmentsTableNameUnions < ActiveRecord::Migration
  def change
    rename_table :departments, :unions
  end
end
