class RolesController < ApplicationController
  
  def index
        
  end


  def show
    #Show selected users in specific role
    
    @c= Role.find(params[:id])
    @users= @c.labels.map{|x| User.find(x.user_id)}
   
    #Show selected jobs in specific role
    @jobs= @c.jobs
  end 
end