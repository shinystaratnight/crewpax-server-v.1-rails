class UsersController < ApplicationController
  before_filter :set_category, only: :index

  def index
    @users= User.all
      if @category.present?
        @users.by_category @category
      end
    @users = @users.page(params[:page] || 1).per(20)
  end

  def show
    @user = User.find params[:id]
    @calendar = @user.calendar
  end

  protected

  def set_category
    @category = Category.find params[:category_id] if params[:category_id]
  end

  # def category_params
  #   params.require(:category).permit :name, :id, :categorized_id, :categorized_type
  # end
end
