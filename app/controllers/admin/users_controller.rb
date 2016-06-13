class Admin::UsersController < ApplicationController

  before_filter :require_admin

  def index
    @users = User.all
  end

  def update
    @user = User.find(params[:id])
    binding.pry 
    respond_to do |format|
      if @user.update_attributes(user_params)
        # format.html{redirect_to @user}
        format.json{render json: @user}
      else
        format.html{render action: "edit"}
        format.json{render json: @user.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end

  def create
    @user = User.new(user_params)
      respond_to do |format|
        if @user.save
          format.html{render @user}
          format.json{render json: @user}
        else 
          format.html { render action: "new" }
          format.json { render json: @user.errors.full_messages}
        end
      end  
  end

  def edit
    @user = User.find(params[:id])
    redirect_to  edit_user_path(@user)
  end

  def destroy
    user = User.find(params[:id])
    results = {result: false}

    respond_to do |format|
      if user.destroy
        results[:result] = true
        format.json{render json: results, status: :ok}
      end
    end
  end


  private

  def user_params
    params.require(:user).permit( :name, :id, :image, :last_sign_in_at,:password, :password_confirmation,
            :email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, 
            :admin, :phone,{roles_ids:[]})
  end


end