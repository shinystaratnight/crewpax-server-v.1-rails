class RegistrationsController < Devise::RegistrationsController
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
# question: how to check and delete old labels 
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
end
