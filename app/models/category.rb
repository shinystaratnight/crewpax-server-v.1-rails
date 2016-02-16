# class Category < Struct.new(:id, :name)
#   YAML.load_file(Rails.root.join('config', 'categories.yml')).each do |category|
#     @@categories ||= []
#     @@categories << Category.new(category['name'].parameterize, category['name'])
#   end

#   class << self
#     def all
#       @@categories
#     end

#     def find(id)
#       all.detect { |c| c.id == id }
#     end
#   end
# end

class Category < ActiveRecord::Base
  belongs_to :categorized, polymorphic: true
end
