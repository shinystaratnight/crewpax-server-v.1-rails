class AddColumnsToAttachments < ActiveRecord::Migration
  def change
    add_column :attachments,:client_email,:string
    add_column :attachments,:client_name, :string
    add_column :attachments,:file_store_path,:string
    add_column :attachments,:file_share_link,:string
  end
end
