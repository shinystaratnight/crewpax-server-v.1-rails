class Admin::RolesController < ApplicationController

  def index
    @roles = Role.all
  end

  def destroy
    @role = Role.find(params[:id])

     @role.destroy

  end


end 