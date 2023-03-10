class Admin::UnionsController < ApplicationController

  before_filter :require_admin

  def index
    @unions = Union.all
  end

  def update
    @union = Union.find(params[:id])
    respond_to do |format|
      if @union.update_attributes(union_params)
        format.json{render json: @union}
      else
        format.html{render action: "edit"}
        format.json{render json: @union.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end

  def create
    @union = Union.new(union_params)
      respond_to do |format|
        if @union.save
          format.html{render @user}
          format.json{render json: @union}
        else 
          format.html { render action: "new" }
          format.json { render json: @user.errors.full_messages}
        end
      end  
  end

  def destroy
    union = Union.find(params[:id])
    results = {result: false}
    results[:result] = true if union.destroy

    results.to_json
    render json: results, status: :ok
  end


  private

  def union_params
    params.require(:union).permit(:name, :has_member_status, :has_permit_status, :id)
  end


end