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
    @attachment= Attachment.find(params[:id])
    @attachment.update_attributes(attachment_params)
    file_store_path=@attachment.file.file["path"]
    file_share_link=client.shares(file_store_path)["url"]
    @attachment.update(file_store_path: file_store_path, file_share_link: file_share_link)
    
    #send the email
    if file_share_link.present?
      AttachmentMailer.email_attachment(@attachment).deliver_now
    end
  
    # response= HTTParty.post("https://api.dropboxapi.com/2/files/get_metedata",:query=>{:path=>@dropbox_path},:header=>{"Authorization"=>"Bearer a5EOiD-7NCAAAAAAAAAAIr6OyOLBb4hmsPGXGrw4MUduHZZTRYIjbtYuDstFUSEN"})
    
    respond_to do |format|  
      if file_share_link.present?  
        format.html{render @user}
        format.json{render json: @attachment}
      end
    end



  end


  def destroy

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