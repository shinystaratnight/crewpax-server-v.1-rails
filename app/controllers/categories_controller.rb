class CategoriesController < ApplicationController
  
  def index
    
  end


  def show
    @labels = Label.search_by_category(params[:id])
    # binding.pry
    # if @category.present?
    #  @labels= Label.search_by_category(params[:category_id])
  
    # end
    #  binding.pry
    # # @users = @users.page(params[:page] || 1).per(20)
  end




 
end