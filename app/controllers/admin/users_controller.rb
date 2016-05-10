class Admin::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update_attributes(user_params)
        format.html{redirect_to @user}
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


  def destroy
    user = User.find(params[:id])

    results = {result: false}
    results[:result] = true if user.destroy

    results.to_json
    render json: results, status: :ok
  end


  private

  def user_params
    params.require(:user).permit(:name)
  end


end