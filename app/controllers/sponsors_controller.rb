class SponsorsController < ApplicationController
  before_filter :require_admin
 
  def create
    @sponsor = Sponsor.new(sponsor_params)
    client = dropbox_client 
    respond_to do |format|      
      if @sponsor.save
        format.json { render json: @sponsor, status: :created, location: @sponsor }
      else
        format.json {render json: @sponsor.errors.full_messages }
      end
    end
  end

  def update
    @sponsor = Sponsor.find(sponsor_params[:id])
    respond_to do |format|
      if @sponsor.update_attributes(sponsor_params)
        format.json{render json: @sponsor, status: :ok}
      else
        format.json {render json: @sponsor.errors.full_messages }
      end
    end
  end

  def edit
    @sponsor = Sponsor.find(sponsor_params[:id])    
  end

  def destroy
    @sponsor = Sponsor.find(sponsor_params[:id])
    respond_to do |format|
      if @sponsor.destroy
        format.json{render json: "Sponsor has been deleted successfully"}
      else
        format.json {render json: @sponsor.errors.full_messages }
      end
    end
  end

  private
  def sponsor_params
    params.require(:sponsor).permit(:id, :picture, :website_url,:name)
  end

  def dropbox_client
    @dropbox_client ||= begin
    session = DropboxSession.new(ENV["APP_KEY"], ENV["APP_SECRET"])
    session.set_access_token( ENV["ACCESS_TOKEN"], ENV["ACCESS_TOKEN_SECRET"])
    DropboxClient.new(session, "app_folder")
    end
  end
 
end