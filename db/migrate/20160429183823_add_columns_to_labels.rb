class AddColumnsToLabels < ActiveRecord::Migration
  def change
    add_column :labels, :job_board, :string
    add_column :labels, :hiring_board, :string
  end
end
