class AddAdminLastLoginToUserTable < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.boolean :admin 
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip
      t.integer  :sign_in_count, :default => 0
    end
  end
end
