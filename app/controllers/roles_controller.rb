class RolesController < ApplicationController

  def index
    
        
  end


  def show

  end

  private 
  def role_params
    params.require(:role).permit(:name)
  end
end