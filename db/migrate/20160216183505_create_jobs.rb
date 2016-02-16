class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs, id: :uuid do |t|
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
    end

    add_reference :jobs, :category, index:true
  end
end
