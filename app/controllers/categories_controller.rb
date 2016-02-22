class CategoriesController < ApplicationController
  
  def index
  # Firstly, need to show all 
    @category = Category.all

    
  end


  def show
    #showing specific user- category

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