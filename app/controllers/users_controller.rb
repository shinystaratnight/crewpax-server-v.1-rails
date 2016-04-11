class UsersController < ApplicationController
  before_filter :set_role, only: :index
  respond_to :html, :js, :json
  def index
    @users = User.all
      # binding.pry
      # if @role.present?
      #   @labels= Label.search_by_role(params[:role_id])
      # end
    # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
     @users = @users.page(params[:page] || 1).per(20)
  end

  def show

    @user = User.find params[:id]
    @appointments = @user.appointments.map{|a| a.date} 
    @eligibilities = @user.eligibilities
    unions = @user.unions
    @unions = unions.uniq{|union| union["id"]}
    @roles = @user.roles
    @certificates = @user.certificates
    
    respond_to do |format|
    # start_date, a param will be changed if the user clicks on the 'previous'/ 'next'
    # button to view the other month
      if params[:start_date].present? 
        @start_date = params[:start_date]
        @date_range = @user.date_range(@start_date)
       
        format.js
      else
        @start_date = @user.start_date
        @date_range = @user.date_range(@start_date)
        format.html{render :show}

      end
    end

  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      # this is for carrierwave photo upload
      if user_params[:image].present?
        @file = user_params[:image]
        @user.image = @file
        @user.save
        format.json{render json: @user}
      # this is to create label rows in labels table(joint table of user_id, role_id and job_id)
      elsif user_params[:roles_ids].present?
        @label = Label.new(role_id:user_params[:roles_ids][0], user_id:@user.id)
        if @label.save!
          format.json{render json: @label}
        end
      elsif @user.update_attributes(user_params)  
        format.html{ redirect_to @user}
        format.json{ render json: @user}
      else
        format.html{ render action: "edit"}
        format.json{ render json: @user.errors.full_messages, status: :unprocessable_entity}
      end
    end

  end
  
  def edit
    @user = User.find(params[:id])
    @addresses = @user.addresses 
    
    @user_unions = @user.unions 
    @unions = Union.all
    @roles = @user.roles
    @eligibilities = @user.eligibilities

  end






  def destroy
    @user = User.find(params[:id])
    respond_to do |format|
      if user_params[:roles_ids].present?
        @label = Label.find_by(role_id:user_params[:roles_ids][0], user_id: @user.id) 
        @label.destroy
        format.json{render json: @label, status: :no_content}
      else
        format.html{redirect_to @user}
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

  def label_params
    params.require(:label).permit(:user_id,:job_id,:role_id)
  end
  

  

     
end
