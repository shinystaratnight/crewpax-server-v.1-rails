class CertifiablesController < ActionController::Base
  def create
    @certifiable = Certifiable.create(certifiable_params)
    respond_to do |format|
      if @certifiable.save
        format.html{render @user}
        format.json{render json: @certifiable}
      else
        format.html{render action: "new"}
        format.json{render json: @certifiable.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end


  def destroy
    @certifiable = Certifiable.find(params[:id])
    respond_to do |format|
      if @certifiable.destroy
        format.html{render @user}
        format.json{render json: @certifiable, status: :no_content}
      else
        format.json{render json: @certifiable.errors.full_messages}
      end
    end
  end

  private
  def certifiable_params
    params.require(:certifiable).permit(:user_id, :certificate_id,:id)
  end
end