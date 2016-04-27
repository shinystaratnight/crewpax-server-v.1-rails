class JobsController < ApplicationController
  before_filter :set_job, :authenticate, only: [:show, :edit, :update, :destroy]
  before_filter :authorize, only: [ :edit, :update, :destroy]
  before_filter :set_role, only: :index
  
  
  def index
    #scope will return false b/c in jobs table, :published filed is set default 
    #to be false
    @jobs = Job.published 
      # if @role.present?
      #   @jobs = @jobs.by_role @role
      # end
    @jobs = @jobs.page(params[:page] || 1).per(20)
  end

  def new
    @job = Job.new
  end

  def create
    @job = Job.new(job_params)
    if @job.save!
      JobMailer.confirmation(@job).deliver_now
      redirect_to jobs_path, notice: 'Confirmation email has been sent.'
    else
      render :new
    end
  end

  def show # GET method, can be triggered by anything, gmail, bots, etc...
    unless @job.published
      if @authenticated
        @job.update_attribute :published, true
        flash.now[:success] = 'Job has been published.'
      else
        raise ActionController::RoutingError.new 'Not Found'
      end
    end
  end

  def edit
  end

  def update
    if @job.update_attributes job_params
      redirect_to job_path(@job, secret: params[:secret]), notice: 'Job has been updated.'
    else
      render :edit
    end
  end

  def destroy
    @job.destroy
    redirect_to jobs_path, notice: 'Job has been removed.'
  end

  protected

  def set_role
    @role = Role.find params[:role_id] if params[:role_id]
  end

  def set_job
    @job = Job.find(params[:id])
  end

  def authenticate
    @authenticated = user_signed_in? || @job.secret == params[:secret] # https://www.owasp.org/index.php/Covert_timing_channel
  end

  def authorize
    raise ActionController::RoutingError.new 'Not Found' unless @authenticated
  end

  def job_params
    params.require(:job).permit(:id, :name, :role_id, :description, :starts_on, :ends_on, :location, :company_name, :contact_name, :contact_phone, :contact_email,:secret)
  end

 
end
