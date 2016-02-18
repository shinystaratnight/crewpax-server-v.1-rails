class RemoveCategorizedInfo < ActiveRecord::Migration
  def change
    change_table :categories do |t|
      t.remove :categorized_id
      t.remove :categorized_type
    end
  end
end
