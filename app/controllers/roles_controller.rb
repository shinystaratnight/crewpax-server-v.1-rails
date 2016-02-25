class RolesController < ApplicationController
  
  def index
        
  end


  def show
    #Show selected users in specific role
    
    @c= Role.find(params[:id])
    @users= @c.labels.map{|x| User.find(x.user_id)}


    #Show selected jobs in specific role
    @jobs= Job.find_by(role_id: params[:id])
    
  end 
end