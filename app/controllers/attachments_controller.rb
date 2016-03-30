require 'dropbox_sdk'
APP_KEY = ENV["APP_KEY"]
APP_SECRET = ENV["APP_SECRET"]


class AttachmentsController < ApplicationController
  protect_from_forgery
  def create
    @attachment= Attachment.new(attachment_params)
    @user = User.find(attachment_params[:user_id])
    respond_to do |format|
      if @attachment.save
        format.html{render @user}
        format.json{render json: @attachment}
      end
    end
    # file= open(attachment_params[:file].tempfile)
   
    # uploader=AttachmentUploader.new 
    # binding.pry
    # uploader.store!(file)
  end    
   
  def update

    client = dropbox_client
    # resp = client.put_file(attachment_params[:file].original_filename, open(attachment_params[:file]),overwrite=false, parent_rev=nil)
    @attachment= Attachment.find(params[:id])
    @attachment.update_attributes(attachment_params)
    respond_to do |format|
      @dropbox_path=@attachment.file.file["path"]
      if @dropbox_path.present?
        binding.pry
        format.html{render @user}
        format.json{render json: @dropbox_path}
      end
    end



  end
    
    # attachment = current_user.attachments.create(attachment_params)

    # if attachment.persisted?
    #   redirect_to current_user 
    # # @attachment = Attachment.new(attachment_params)
    # else 
    #   redirect_to current_user, flash:{error: attachment.errors.full_messages}
    # end
 

  def destroy

  end

  private
  def attachment_params
    params.require(:attachment).permit(:id, :name, :type, :file,:user_id)
    # params.require(:file).permit(:type)
  end

  def dropbox_client
    @dropbox_client ||= begin
    session = DropboxSession.new(ENV["APP_KEY"], ENV["APP_SECRET"])
    session.set_access_token( ENV["ACCESS_TOKEN"], ENV["ACCESS_TOKEN_SECRET"])
    DropboxClient.new(session, "dropbox")
    end
  end

  # def config
  #   @config ||= {}

  #   @config[:app_key] ||= uploader.dropbox_app_key
  #       @config[:app_secret] ||= uploader.dropbox_app_secret
  #       @config[:access_token] ||= uploader.dropbox_access_token
  #       @config[:access_token_secret] ||= uploader.dropbox_access_token_secret
  #       @config[:access_type] ||= uploader.dropbox_access_type || "dropbox"
  #       @config[:user_id] ||= uploader.dropbox_user_id

  #       @config
  
end