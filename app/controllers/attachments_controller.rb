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
    @attachment= Attachment.find(params[:id])
    respond_to do |format|
      if @attachment.update_attributes(attachment_params)
        # @dropbox_path=@attachment.file.file["path"]
        binding.pry
        format.html{render @user}
        format.json{render json: @attachment}
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
end