class AdminController < ApplicationController

  def index
    @unions = Union.all
  end

end