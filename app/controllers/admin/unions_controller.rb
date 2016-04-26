class Admin::UnionsController < ApplicationController

  def index
    @unions = Union.all
  end

  def update
    @union = Union.find(params[:id])
    respond_to do |format|
      if @union.update_attributes(union_params)
        format.html{redirect_to @user}
        format.json{render json: @union}
      else
        format.html{render action: "edit"}
        format.json{render json: @union.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end

  private

  def union_params
    params.require(:union).permit(:name)
  end


end