class Admin::CertificatesController < ApplicationController

  before_filter :require_admin
  
  def create
    @certificate = Certificate.create(certificate_params)
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
        format.json{render json: @certificate}
      else
        format.html{render action: "edit"}
        format.json{render json: @certificate.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    certificate = Certificate.find(params[:id])

    results = {result: false}
    results[:result] = true if certificate.destroy

    results.to_json
    render json: results, status: :ok
  end

  private
  def certificate_params
    params.require(:certificate).permit(:user_id, :certifiable_id, :id, :name)
  end
end