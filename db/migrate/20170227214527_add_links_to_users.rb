class AddLinksToUsers < ActiveRecord::Migration
  def change
    add_column :users, :imdb, :string
    add_column :users, :youtube, :string
    add_column :users, :vimeo, :string
    add_column :users, :linkedin, :string
    add_column :users, :facebook, :string
  end
end
