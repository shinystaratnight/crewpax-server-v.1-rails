class RolesController < ApplicationController
  
  def index
        
  end


  def show
    #Show selected users in specific category

    @c= Role.find(params[:id])
    @users = @c.users

    #Show selected jobs in specific category
    @jobs= Job.find_by(role_id: params[:id])
    
  end 
end