class Admin::RolesController < ApplicationController

  before_filter :require_admin

  def index
    @roles = Role.all 
  end

  def create
    role = Role.create(role_params)
    respond_to do |format|
      if role.save
        format.html{render @user}
        format.json{render json: @role}
      else
        format.html{render action: "new"}
        format.json{render json: @role.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    role = Role.find(params[:id])

    results = {result: false}
    results[:result] = true if role.destroy

    results.to_json
    render json: results, status: :ok
  end

  def update
    @role = Role.find(params[:id])
    respond_to do |format|
      if @role.update_attributes(role_params)
        format.html{redirect_to @user}
        format.json{render json: @role}
      else
        format.html{render action: "edit"}
        format.json{render json: @role.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end


  private

  def role_params
    params.require(:role).permit(:name)
  end

end 