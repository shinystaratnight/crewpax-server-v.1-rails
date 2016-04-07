class AddressesController < ActionController::Base

  def create
    @address = Address.new(address_params)
    respond_to do |format|
      if @address.save
        format.html{redirect_to @user}
        format.json{render json: @address}
      else
        format.html{render action: "new"}
        format.json{render json: @address.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end


  def update
    @address= Address.find(params[:id])
    respond_to do |format|
      if @address.update_attributes(address_params)
        format.html{redirect_to @user}
        format.json{render json: @address}
      else
        format.html{render action: "edit"}
        format.json{render json: @address.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end


  private

  def address_params
    params.require(:address).permit(:type, :address_input, :user_id)
  end
end