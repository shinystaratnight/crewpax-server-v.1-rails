class MessageTables < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :content
      t.references :user, index: true, foreign_key: true
    end
  end
end
