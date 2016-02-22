class CategoriesController < ApplicationController
  
  def index
        
  end


  def show
    #Show selected users in specific category

    @c= Category.find(params[:id])
    @users = @c.users

    #Show selected jobs in specific category
    @jobs= Job.find_by(category_id: params[:id])
    
  end 
end