class EligibilitiesController < ActionController::Base
  def create   
    @eligibility= Eligibility.new(eligibility_params)
      respond_to do |format|
        if @eligibility.save
          format.html{render @user}
          format.json{render json: @eligibility}
        else 
          format.html { render action: "new" }
          format.json { render json: @user.errors.full_messages}
        end
      end  
  end

  def update 
    @eligibility = Eligibility.find (eligibility_params[:id])
    respond_to do |format| 
      if @eligibility.update_attributes(eligibility_params)
        format.json{render json: @eligibility}
      else
        format.json{render json: @eligibility.errors.full_messages}
      end
    end
  end

  def destroy
    @eligibility = Eligibility.find(params[:id])
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
    params.require(:eligibility).permit(:id,:member,:permit_days, :user_id, :union_id, :role_id)
  end

end