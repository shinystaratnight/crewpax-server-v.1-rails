# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160330165605) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "addresses", force: :cascade do |t|
    t.string  "type"
    t.string  "address_input"
    t.integer "user_id"
  end

  add_index "addresses", ["user_id"], name: "index_addresses_on_user_id", using: :btree

  create_table "appointments", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "day"
  end

  add_index "appointments", ["user_id"], name: "index_appointments_on_user_id", using: :btree

  create_table "attachments", force: :cascade do |t|
    t.string  "name"
    t.string  "type"
    t.string  "file"
    t.integer "user_id"
    t.string  "client_email"
    t.string  "file_store_path"
    t.string  "file_share_link"
  end

  add_index "attachments", ["user_id"], name: "index_attachments_on_user_id", using: :btree

  create_table "certifiables", force: :cascade do |t|
    t.integer "user_id"
    t.integer "certificate_id"
  end

  add_index "certifiables", ["certificate_id"], name: "index_certifiables_on_certificate_id", using: :btree
  add_index "certifiables", ["user_id"], name: "index_certifiables_on_user_id", using: :btree

  create_table "certificates", force: :cascade do |t|
    t.string "name"
  end

  create_table "eligibilities", force: :cascade do |t|
    t.boolean "member"
    t.integer "permit_days"
    t.integer "user_id"
    t.integer "union_id"
    t.integer "role_id"
  end

  add_index "eligibilities", ["role_id"], name: "index_eligibilities_on_role_id", using: :btree
  add_index "eligibilities", ["union_id"], name: "index_eligibilities_on_union_id", using: :btree
  add_index "eligibilities", ["user_id"], name: "index_eligibilities_on_user_id", using: :btree

  create_table "jobs", id: :uuid, default: "uuid_generate_v4()", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.date     "starts_on"
    t.date     "ends_on"
    t.string   "location"
    t.string   "contact_name"
    t.string   "contact_phone"
    t.string   "contact_email"
    t.string   "company_name"
    t.string   "secret"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "published",     default: false
    t.integer  "role_id"
  end

  add_index "jobs", ["role_id"], name: "index_jobs_on_role_id", using: :btree

  create_table "labels", force: :cascade do |t|
    t.integer "user_id"
    t.uuid    "job_id"
    t.integer "role_id"
  end

  add_index "labels", ["role_id"], name: "index_labels_on_role_id", using: :btree
  add_index "labels", ["user_id"], name: "index_labels_on_user_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string "name"
  end

  create_table "unions", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                      default: "",    null: false
    t.string   "encrypted_password",         default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "photo"
    t.string   "phone"
    t.boolean  "is_dgc_member",              default: false
    t.boolean  "has_traffic_control_ticket", default: false
    t.boolean  "has_vehicle",                default: false
    t.string   "image"
    t.boolean  "admin"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "sign_in_count",              default: 0
    t.integer  "roles_ids",                  default: [],                 array: true
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "addresses", "users"
  add_foreign_key "attachments", "users"
  add_foreign_key "certifiables", "certificates"
  add_foreign_key "certifiables", "users"
  add_foreign_key "eligibilities", "roles"
  add_foreign_key "eligibilities", "unions"
  add_foreign_key "eligibilities", "users"
  add_foreign_key "labels", "roles"
  add_foreign_key "labels", "users"
end
