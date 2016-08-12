class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      #Flash message for users who sign up with credentials and later login with facebook
      if @user.encrypted_password.present?
        set_flash_message(:notice, :success_with_credentials_signup, :kind => "Facebook") if is_navigational_format?
      else
      #Flash message for users who sign up with facebook and later login with credentails       
        set_flash_message(:notice, :success_with_facebook_signup, :kind => "Facebook") if is_navigational_format?
      end
    else
      # if user is not created due to validation fails
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to  new_user_registration_path
    end
  end

  def failure
    redirect_to root_path
  end
end