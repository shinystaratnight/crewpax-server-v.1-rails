class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string   "email",                      default: "",    null: false
      t.string   "encrypted_password",         default: "",    null: false
      t.string   "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "image"
      t.string   "name"
      t.string   "photo"
      t.string   "phone"
      t.boolean  "is_dgc_member",              default: false
      t.boolean  "has_traffic_control_ticket", default: false
      t.boolean  "has_vehicle",                default: false
    end

    add_reference :users, :category, index:true
    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique:true
  end
end
