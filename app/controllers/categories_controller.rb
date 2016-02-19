class CategoriesController < ApplicationController

  def index
    
  end


  def show
    if @category.present?
      @labels= Label.search_by_category(params[:category_id])
      binding.pry
    end
  end
end