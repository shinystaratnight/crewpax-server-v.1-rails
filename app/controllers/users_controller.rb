class UsersController < ApplicationController
  before_filter :set_category, only: :index

  def index
    @users= User.all
      # binding.pry
      if @category.present?
        @labels= Label.search_by_category(params[:category_id])
       binding.pry
      end
    # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
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

  # def user_params
  #   params.require(:user).permit :name, :id, :categorized_id, :categorized_type
  # end
end
