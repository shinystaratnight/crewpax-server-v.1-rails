# This is the customized registrations controller for devise
class RegistrationsController < Devise::RegistrationsController
# When a user is created, it needs to call create_label_of_user_role to create the associated label
  
  def new
    @roles = Role.all
    @eligibilities = Eligibility.all 
    @unions = Union.all
    @certificates = Certificate.all
    @attachment = Attachment.new
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors.full_messages}
      end   
    end
  end
   
 
  protected

  def after_sign_up_path_for(resource)
    user_path(resource)
  end

  def after_update_path_for(resource)
    user_path(resource)
  end
     

# To prevent Mass assignments.Require that :user be a key in the params Hash to accept various attributes
  def user_params 
    params.require(:user).permit(:name, :id, :image, :password, :password_confirmation,
    :email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, 
    :admin, :phone, { roles_ids: [] }, :addresses_attributes => [:type, :address_input])
  end


end
