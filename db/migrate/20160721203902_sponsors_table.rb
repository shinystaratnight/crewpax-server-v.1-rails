class SponsorsTable < ActiveRecord::Migration
  def change
    create_table :sponsors do |t|
      t.string :picture
      t.string :website_url
    end
  end
end
