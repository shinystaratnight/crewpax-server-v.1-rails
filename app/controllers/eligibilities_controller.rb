class EligibilitiesController < ActionController::Base

  def create
    @eligibility= Eligibility.new(eligibility_params)

  end


  def update

  end


  private
  def eligibility_params
    params.require(:eligibility).permit(:member,:permit_days, :user_id, :union_id, :role_id)
  end

end