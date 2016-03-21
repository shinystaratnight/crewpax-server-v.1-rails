class CreateCertificatesTable < ActiveRecord::Migration
  def change
    create_table :certificates do |t|
      t.string :name
    end
  end
end
