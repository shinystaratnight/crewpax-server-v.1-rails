class AppointmentsController < ApplicationController
  def index
   
    @user = User.find(params[:user_id])
    @appointments = @user.appointments
    respond_to do |format|
      if @appointments.empty? 
        format.html {render @user}
        format.json {render json: @appointments}
      else 
        format.html {render @user}
        format.json {render json: @appointments}
      end
    end


  end

  def create
    @appointment= Appointment.new(appointment_params)
    respond_to do |format|
      if @appointment.save
        format.json{render json: @appointment}
      else
        format.html{render action: "new"}
        format.json{render json: @address.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end
  
  def destroy
    @appointment = Appointment.find(params[:id])
    respond_to do |format|
      if @appointment.destroy 
        format.html{render @user }
        format.json{render json: @appointment, status: :no_content}
      else
        format.json{render json: @appointment.errors.full_messages}
      end
    end
  end

  # before_filter :authenticate_user!

  # def toggle
  #   appointment = current_user.appointments.where date: params[:date]

  #   if appointment.exists?
  #     appointment.first.destroy
  #   else
  #     current_user.appointments.create date: params[:date]
  #   end

  #   render nothing: true
  # end
  private

  def appointment_params
    params.require(:appointment).permit(:user_id,:day, :id,:date,:week)
  end


     
end
