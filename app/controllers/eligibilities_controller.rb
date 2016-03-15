class EligibilitiesController < ActionController::Base
  def create   
    @eligibility= Eligibility.new(eligibility_params)
      respond_to do |format|
        if @eligibility.save
          format.html{render @user}
          format.json{render json: @eligibility}
        else 
          format.html { render action: "new" }
          format.json { render json: @user.errors}
        end
      end  
  end


  def update 
    @eligibility = Eligibility.find (params[:id])
  end


  private
  def eligibility_params
    params.require(:eligibility).permit(:id,:member,:permit_days, :user_id, :union_id, :role_id)
  end

end