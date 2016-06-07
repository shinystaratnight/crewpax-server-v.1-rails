class Admin::JobsController < ApplicationController

  before_filter :require_admin
  
end