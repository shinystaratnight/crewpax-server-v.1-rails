class UsersController < ApplicationController
  before_filter :set_category, only: :index

  def index
    scope = User.all
    if @category.present?
      scope.where! '? = ANY(category_ids)', @category.id
    end
    @users = scope.page(params[:page] || 1).per(20)
  end

  def show
    @user = User.find params[:id]
    @calendar = @user.calendar
  end

  protected

  def set_category
    @category = Category.find params[:category_id]
  end
end
