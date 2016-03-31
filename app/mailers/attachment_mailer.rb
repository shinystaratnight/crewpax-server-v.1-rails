class AttachmentMailer < ActionMailer::Base
  default from: "bcpax.developer@gmail.com"
  layout 'mailer'
  def email_attachment(attachment)
    @attachment=attachment 
    @user = User.find(attachment.user_id)
    mail to: attachment.client_email, subject: "Re: \"#{@attachment.type }\" "
  end
end
