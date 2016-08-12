class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  before_filter :configure_permitted_parameters, if: :devise_controller?
 

  def after_sign_in_path_for(resource)
    user_path(resource)
  end
  
 
  protected

  def configure_permitted_parameters
    permitted_parameters = [:name, :image, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, :phone, { roles_ids: [] }, :remote_iamge_url]

    [:sign_up, :account_update].each do |action|
      permitted_parameters.each do |parameter|
        devise_parameter_sanitizer.for(action) << parameter
      end
    end
  end

## ashley added the methods below.

  def restrict_access
    if !user_signed_in?
      flash[:alert] = "You must log in."
      redirect_to '/'
    end
  end

  def require_admin
    if !current_user.admin?
      flash[:alert] = "You don't have that privilege."
      redirect_to '/'
    end
  end

## ashley added the methods above.
end
