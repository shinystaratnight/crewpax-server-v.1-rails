class AddCategorizedInfoToCategories < ActiveRecord::Migration
  def change
    add_reference :categories,:categorized, polymorphic: true, index: true
  end
end
