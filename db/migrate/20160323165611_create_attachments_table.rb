class CreateAttachmentsTable < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :name
      t.string :type
      t.string :file
      t.references :user, index: true, foreign_key: true
    end
  end
end
