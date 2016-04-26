class AdminController < ApplicationController

  def index
    @unions = Union.all
    @roles = Role.all
    @certificates = Certificate.all
    @users = User.all
  end

end