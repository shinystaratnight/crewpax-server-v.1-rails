class CreateCertifiablesTable < ActiveRecord::Migration
  def change
    create_table :certifiables do |t|
      t.references :user, index: true, foreign_key: true
      t.references :certificate, index: true, foreign_key: true
    end
  end
end
