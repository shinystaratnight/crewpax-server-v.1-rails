class AddJobFilledToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :job_filled, :boolean, default: false
  end
end
