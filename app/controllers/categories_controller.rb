class CategoriesController < ApplicationController
  
  def index
    
  end


  def show
    @c= Category.find(params[:id])
    @users = @c.users
    # @labels = Label.search_by_category(params[:id])
    
    # if @category.present?
    #  @labels= Label.search_by_category(params[:category_id])
  
    # end
    #  binding.pry
    # # @users = @users.page(params[:page] || 1).per(20)
  end




 
end