class RolesController < ApplicationController
  
  def index
   #role_params["name"] => ["director", "key PA"]
    array = params["role"]["name"]
    @roles=[]
    array.each do |role_param|
      @role=Role.find_by(name:role_param)    
      @roles.push(@role)
    end
    respond_to do |format|
      format.html{redirect_to @user}
      format.json{render json: @roles}
    end
        
  end


  def show
    #Show selected users in specific role
    
    @c= Role.find(params[:id])
    @users= @c.labels.map{|x| User.find(x.user_id)}
   
    #Show selected jobs in specific role
    @jobs= @c.jobs
  end

  private 
  def role_params
    params.require(:role).permit(:name)
  end
end