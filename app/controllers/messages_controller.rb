require 'twilio-ruby'


class MessagesController < ApplicationController

  include Webhookable

  after_filter :set_header

  skip_before_action :verify_authenticity_token



  def new
    @message = Message.new
  end


  def create
    current_user_id = current_user.id
    number_to_send_to = params[:recipient_phone]
    @message = Message.new(message_params)
    @message.user_id = current_user_id
    account_sid = ENV["TWILIO_ACCOUNT_SID"]
    auth_token = ENV["TWILIO_AUTH_TOKEN"]
    @twilio_number = ENV["TWILIO_PHONE_NUMBER"] ## In Production
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