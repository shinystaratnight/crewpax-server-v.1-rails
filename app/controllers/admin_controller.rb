class AdminController < ApplicationController

  before_filter :restrict_access
  before_filter :require_admin

  def index
    @unions = Union.all
    @roles = Role.all
    @certificates = Certificate.all
    @users = User.all
    @jobs = Job.all
  end

end