class AddUserIdToJobsTable < ActiveRecord::Migration
  def change
    change_table :jobs do |t|
      t.references :user, index: true, foreign_key: true
    end
  end
end
