class UsersController < ApplicationController
  before_filter :set_role, only: :index

  def index
    @users= User.all
      # binding.pry
      # if @role.present?
      #   @labels= Label.search_by_role(params[:role_id])
      #  binding.pry
      # end
    # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
     @users = @users.page(params[:page] || 1).per(20)
  end

  def show
    @user = User.find params[:id]
    @calendar = @user.calendar
  end

  protected

  def set_role
    @role = Role.find params[:role_id] if params[:role_id]
  end

  # def user_params
  #   params.require(:user).permit :name, :id, :categorized_id, :categorized_type
  # end
end
