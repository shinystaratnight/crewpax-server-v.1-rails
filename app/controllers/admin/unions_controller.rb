class Admin::UnionsController < ApplicationController

  def index
    @unions = Union.all
  end

end