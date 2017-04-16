require 'twilio-ruby'

class MessagesController < ApplicationController

  include Webhookable

  after_filter :set_header

  skip_before_action :verify_authenticity_token



  def new
    @message = Message.new
   # account_sid = 'AC81b2f44ecba17986b2d59db2c0cc21ef' #ENV["TWILIO_ACCOUNT_SID"]
   # auth_token = '3aa5150c0dd9336b5936e1959774249d' #ENV["TWILIO_AUTH_TOKEN"]
  end


  def create
    current_user_id = current_user.id
    number_to_send_to = params[:recipient_phone]
    @message = Message.new(message_params)
    @message.user_id = current_user_id
    account_sid = ENV["TWILIO_ACCOUNT_SID"] #'AC81b2f44ecba17986b2d59db2c0cc21ef'
    auth_token = ENV["TWILIO_AUTH_TOKEN"] #'3aa5150c0dd9336b5936e1959774249d'
    @twilio_number =  ENV["TWILIO_PHONE_NUMBER"] #'17786554882'  ## In Production
    @twilio_client = Twilio::REST::Client.new account_sid, auth_token
    @sms = @twilio_client.account.messages.create(
      :from => @twilio_number,
      :to => "+1#{number_to_send_to}",
      :body => message_params[:content]
    )

    respond_to do |format|
      if @message.save && @sms.status == 'queued'
        format.json{render json: @sms.status.to_json}
      else
        format.json{render json: @sms.errors.full_messages}
      end
    end

  end


  private
  def message_params
    params.require(:message).permit(:user_id,:content, :recipient_id, :user_id, :recipient_phone)
  end
end