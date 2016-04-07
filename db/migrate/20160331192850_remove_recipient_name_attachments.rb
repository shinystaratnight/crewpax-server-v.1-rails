class RemoveRecipientNameAttachments < ActiveRecord::Migration
  def change
    change_table :attachments do |t|
      t.remove :client_name
    end
  end
end
