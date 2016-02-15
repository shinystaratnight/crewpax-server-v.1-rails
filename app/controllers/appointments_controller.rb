class AppointmentsController < ApplicationController
  before_filter :authenticate_user!

  def toggle
    appointment = current_user.appointments.where date: params[:date]

    if appointment.exists?
      appointment.first.destroy
    else
      current_user.appointments.create date: params[:date]
    end

    render nothing: true
  end
end
