class MessagesController < ApplicationController

  def new
    @message = Message.new 
  end


  def create
    current_user_id = current_user.id
    number_to_send_to = params[:recipient_phone]
    @message = Message.new(message_params)
    @message.user_id = current_user_id
    @twilio_number = "+15005550006"
    
    respond_to do |format|
      if @message.save!
        @twilio_client = Twilio::REST::Client.new

        @sms = @twilio_client.account.messages.create(
          :from => @twilio_number,
          :to => "+1#{number_to_send_to}",
          :body => message_params[:content]
        )

        # format.html{flash[:notice] = "Text message has been successfully sent."}
        format.json{render json: @sms.status}
      end
    end

  end


  private
  def message_params
    params.require(:message).permit(:user_id,:content, :recipient_id, :user_id, :recipient_phone)
  end
end