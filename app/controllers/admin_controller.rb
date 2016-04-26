class AdminController < ApplicationController

  def index
    @unions = Union.all
    @roles = Role.all
    @certificates = Certificate.all
  end

end