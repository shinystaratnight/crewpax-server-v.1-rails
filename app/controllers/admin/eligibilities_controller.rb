class Admin::EligibilitiesController < ApplicationController

  def create
    @eligibility = Eligibility.new(eligibility_params)
    respond_to do |format|
      if @eligibility.save
        format.html{redirect_to @user}
        format.json{render json: @eligibility}
      else
        format.html{render action: "new"}
        format.json{render json: @eligibility.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end


  def destroy
    @eligibility = Eligibility.find(eligibility_params)
     respond_to do |format|
      if @eligibility.destroy 
        format.html{render @user }
        format.json{render json: @eligibility, status: :no_content}
      else
        format.json{render json: @eligibility.errors.full_messages}
      end
    end
  end

  private

  def eligibility_params
    params.require(:eligibility).permit(:union_id, :role_id)
  end


end