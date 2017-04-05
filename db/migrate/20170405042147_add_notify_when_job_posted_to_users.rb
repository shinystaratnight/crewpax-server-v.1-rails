class AddNotifyWhenJobPostedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :notify_when_job_posted, :string, default: "selected_roles"
  end
end
