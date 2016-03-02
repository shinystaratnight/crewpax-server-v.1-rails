class UsersController < ApplicationController
  before_filter :set_role, only: :index

  def index
    @users= User.all
      # binding.pry
      # if @role.present?
      #   @labels= Label.search_by_role(params[:role_id])
      # end
    # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
     @users = @users.page(params[:page] || 1).per(20)
  end

  def show
    @user = User.find params[:id]
    @calendar = @user.calendar
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|  
      if @user.update_attributes(user_params)  
        format.html{ redirect_to new_user_registration_path}
        format.json{ render json: @user}
      else
        format.html{ render action: "edit"}
        format.json{ render json:  {:error =>@user.errors}, status: :unprocessable_entity}
      end
    end
  end
  # account_update_params = devise_parameter_sanitizer.sanitize(:account_update)
  
    # if account_update_params[:password].blank?
    #   account_update_params.delete 'password'
    #   account_update_params.delete 'password_confirmation'
    # end

    # if @user.update_attributes(account_update_params)
    #   update_label_with_user_role(@user)
    #   # sign_in @user, bypass: true
    #   set_flash_message :notice, :updated
    #   redirect_to after_update_path_for(@user)
    # else
    #   render :edit
    # end

  protected

  def set_role
    @role = Role.find params[:role_id] if params[:role_id]
  end

  # To prevent Mass assignments.Require that :user be a key in the params Hash to accept various attributes
  def user_params
    params.require(:user).permit(:name, :id, :image, :password, :password_confirmation,
    :email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, 
    :admin, :phone, { roles_ids: [] }, :addresses_attributes => [:type, :address_input])      
  end
end
