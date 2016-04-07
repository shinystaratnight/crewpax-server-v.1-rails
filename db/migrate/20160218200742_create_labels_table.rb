class CreateLabelsTable < ActiveRecord::Migration
  def change
    create_table :labels do |t|
      t.references :user, index: true, foreign_key: true
      t.references :category, index: true, foreign_key: true
      t.uuid :job_id, foreign_key:true
    end
  end
end
