class AddressesController < ActionController::Base

  def create
    @address = Address.new(address_params)
    respond_to do |format|
      if @address.save!  
        format.html{redirect_to @user}
        format.json{render json: @address}
      else
        format.html{render action: "new"}
        format.json{render json: @address.errors, status: :unprocessable_entity}
      end
    end
  end


  def update
  end


  private

  def address_params
    params.require(:address).permit(:type, :address_input, :user_id)
  end
end