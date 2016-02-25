# This is the customized registrations controller for devise
class RegistrationsController < Devise::RegistrationsController

# When a user is created, it needs to call another method to create the labels
  def create
    @user = User.new(user_params)
    
    if @user.save
      create_label_of_user_role(@user)
      set_flash_message :notice, :signed_up
      redirect_to after_sign_up_path_for(@user) 
    else 
      render :new
    end
  end

  def update
    @user = User.find(current_user.id)

    account_update_params = devise_parameter_sanitizer.sanitize(:account_update)
  
    if account_update_params[:password].blank?
      account_update_params.delete 'password'
      account_update_params.delete 'password_confirmation'
    end

    if @user.update_attributes(account_update_params)
      update_label_with_user_role(@user)
      sign_in @user, bypass: true
      set_flash_message :notice, :updated
      redirect_to after_update_path_for(@user)
    else
      render :edit
    end
  end

  protected

  def after_sign_up_path_for(resource)
    user_path(resource)
  end

  def after_update_path_for(resource)
    user_path(resource)
  end
   
#if an existing label is not found, create a new label with the new role_id 
#Question: how to check and delete old labels.
#Answer: No need to consider this question now, because we will be using ajax to update
  def update_label_with_user_role(user)
    array = @user.roles_ids
      i = 0 
      while i < array.length
        r_id = array[i]
          unless @user.labels.find_by(role_id: r_id)
            @user.labels.create(role_id: r_id)
          end
        i+=1
      end
  end

  def create_label_of_user_role(user)
    array = @user.roles_ids 
      i=0
      while i < array.length 
        r_id = array[i]
       
        @user.labels.create(role_id: r_id)
        i+=1
      end
  end

  def user_params
    params.require(:user).permit :name, :image, :password, :password_confirmation,:email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, :admin, :phone, { roles_ids: [] }
  end
end
