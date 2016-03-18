# This is the customized registrations controller for devise
class RegistrationsController < Devise::RegistrationsController
# When a user is created, it needs to call create_label_of_user_role to create the associated label
  
  def new
    @roles= Role.all
    @eligibilities = Eligibility.all 
    @unions= Union.all
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors.full_messages}
      end
    end
    # response = {result: false}
    # if @user.save!  
    #   response[:result]=true
    #   response[:id]= @user.id
    # else
    #   response[:message]=@user.errors
    #   # create_label_of_user_role(@user)
    #   # set_flash_message :notice, :signed_up
    #   # redirect_to after_sign_up_path_for(@user) 
    # # else 
    # #   render :new
    # end
    #   response.to_json
  end
   
  # def update
  #   binding.pry 
  #   @label= Label.new(label_params)
  #   respond_to do |format| 
  #     if @label.save
  #       format.html{redirect_to @user}
  #       format.json{render json: @label}       
  #     else 
  #       format.html{render action: "new"}
  #       format.json{render json: @user_errors.full_messages}
  #     end
  #   end
  # end


  
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
  # def update_label_with_user_role(user)
  #   array = @user.roles_ids
  #     i = 0 
  #     while i < array.length
  #       r_id = array[i]
  #         unless @user.labels.find_by(role_id: r_id)
  #           @user.labels.create(role_id: r_id)
  #         end
  #       i+=1
  #     end
  # end

  # def create_label_of_user_role(user)
  #   array = @user.roles_ids 
  #     i=0
  #     while i < array.length 
  #       r_id = array[i]
       
  #       @user.labels.create(role_id: r_id)
  #       i+=1
  #     end
  # end

# To prevent Mass assignments.Require that :user be a key in the params Hash to accept various attributes
  def user_params 
    params.require(:user).permit(:name, :id, :image, :password, :password_confirmation,
    :email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, 
    :admin, :phone, { roles_ids: [] }, :addresses_attributes => [:type, :address_input])
  end


  

end
