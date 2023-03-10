class AttachmentsController < ApplicationController
 
  protect_from_forgery
  def create
    @attachment = Attachment.new(attachment_params)
    @user = User.find(attachment_params[:user_id])
    respond_to do |format|
      if @attachment.save
        format.html{render @user}
        format.json{render json: @attachment}
      else
        format.html{render action: "new" }
        format.json{render json: @attachment.errors.full_messages}
      end
    end
  end    
   
  def update
    @attachment = Attachment.find(params[:id])
    if @attachment.file_share_link.present?
      respond_to do |format|
        if @attachment.update_attributes(attachment_params)
          AttachmentMailer.email_attachment(@attachment).deliver_now
          format.html{render @user}
          format.json{render json: @attachment}
        else
          format.json{render json: @attachment.errors.full_messages}
        end
      end
    else
      client = dropbox_client
      respond_to do |format|  
        if @attachment.update_attributes(attachment_params)         
          file_store_path = @attachment.file.file["path"]
          file_share_link = client.shares(file_store_path)["url"]
          @attachment.update(file_store_path: file_store_path, file_share_link: file_share_link)
          #send the email after receive dropbox share link
          if file_share_link.present? 
            AttachmentMailer.email_attachment(@attachment).deliver_now
            format.html{render @user}
            format.json{render json:@attachment}
          end
        else
          format.json{render json: @attachment.errors.full_messages}
        end
      end
    end
  end

 

  def destroy

    @user = User.find(attachment_params[:user_id])
    @attachment= Attachment.find(params[:id])

    respond_to do |format|
      if @attachment.destroy      
        format.json{head :no_content}
      else
        format.json{render json: @attachment.errors.full_messages}
      end
    end
  end

  
  private
    def attachment_params
      params.require(:attachment).permit(:id, :name, :type, :file,:user_id,:file_share_link,:client_email,:file_store_path)
    end

    def dropbox_client
      @dropbox_client ||= begin
      session = DropboxSession.new(ENV["APP_KEY"], ENV["APP_SECRET"])
      session.set_access_token( ENV["ACCESS_TOKEN"], ENV["ACCESS_TOKEN_SECRET"])
      DropboxClient.new(session, "app_folder")
      end
    end
    
end


   
      
      