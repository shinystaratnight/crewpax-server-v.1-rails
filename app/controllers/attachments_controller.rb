class AttachmentsController < ApplicationController
  
  def create
    @attachment= Attachment.new(attachment_params)
 
    if @attachment.save
      redirect_to new_user_registration_path, notice: "File has been successfully uploaded"
    end
   
    # file= open(attachment_params[:file].tempfile)
   
    # uploader=AttachmentUploader.new 
    # binding.pry
    # uploader.store!(file)
   
  
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
    params.require(:attachment).permit(:id, :name, :type, :file)
  end
end