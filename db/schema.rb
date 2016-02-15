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

ActiveRecord::Schema.define(version: 20140321193424) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "appointments", force: true do |t|
    t.date     "date"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "jobs", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.date     "starts_on"
    t.date     "ends_on"
    t.string   "category_id"
    t.string   "location"
    t.string   "contact_name"
    t.string   "contact_phone"
    t.string   "contact_email"
    t.string   "company_name"
    t.string   "secret"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "published",     default: false
  end

  add_index "jobs", ["category_id"], name: "index_jobs_on_category_id", using: :btree

  create_table "users", force: true do |t|
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
    t.string   "category_ids",               default: [],                 array: true
    t.boolean  "is_dgc_member",              default: false
    t.boolean  "has_traffic_control_ticket", default: false
    t.boolean  "has_vehicle",                default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
