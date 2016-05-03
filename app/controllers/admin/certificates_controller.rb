class Admin::CertificatesController < ActionController::Base
  def create
    @certificate=Certificate.create(certificate_params)
    respond_to do |format|
      if @certificate.save
        format.html{render @user}
        format.json{render json: @certificate}
      else
        format.html{render action: "new"}
        format.json{render json: @certificate.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end

  def update
    @certificate = Certificate.find(params[:id])
    respond_to do |format|
      if @certificate.update_attributes(certificate_params)
        format.html{redirect_to @user}
        format.json{render json: @certificate}
      else
        format.html{render action: "edit"}
        format.json{render json: @certificate.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end


  def destroy
    @certificate= Certificate.find(params[:id])
    respond_to do |format|
      if @certificate.destroy
        format.html{render @user}
        format.json{render json: @certificate, status: :no_content}
      else
        format.json{render json: @certificate.errors.full_messages}
      end
    end
  end

  private
  def certificate_params
    params.require(:certificate).permit(:user_id, :certifiable_id, :id, :name)
  end
end