class JobsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :set_job, :authenticate, only: [:show, :edit, :update, :destroy]
  before_filter :authorize, only: [ :edit, :update, :destroy]
  before_filter :set_role, only: :index
  respond_to :html, :js, :json

  def index

    if params[:user_id].present?
      @user_jobs = User.find(params[:user_id]).jobs
      render "job_management"
    else
      @jobs = Job.published
      @jobs.find_most_recent(params[:updated_at])
    end


  end

  def new
    @job = Job.new
  end

  def create
    @job = Job.new(job_params)
    if current_user.present?
      @job.user_id = current_user.id
    end

    if @job.save

      # email the correct users
      User.all.each do |user|
        @rolePresent = false
        if user.notify_when_job_posted == "selected_roles"
          user.roles.each do |rl|
            if @job.role_id.present? && rl.id == @job.role_id
              @rolePresent = true
            end
          end
        end
        if user.notify_when_job_posted == "always" || (user.notify_when_job_posted == "selected_roles" && @rolePresent)
          JobMailer.notification(@job, user.email).deliver_now
        end
      end


      @job.labels.create(role_id: @job.role_id, user_id: current_user.id)
      @job.update_attribute :published, true
      redirect_to jobs_path, notice: 'Job has been published.'

    else
      redirect_to new_job_path
      flash[:danger] = @job.errors.full_messages.to_sentence
    end
  end

  def show # GET method, can be triggered by anything, gmail, bots, etc...
    unless @job.published
      if @authenticated
        if current_user.present?
          @job.labels.create(role_id: @job.role_id, user_id: current_user.id)
          @job.update_attribute :published, true
          flash.now[:success] = 'Job has been published.'
        else
          @job.labels.create(role_id: @job.role_id)
          @job.update_attribute :published, true
          flash.now[:success] = 'Job has been published.'
        end
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
    if @job.destroy
      @job.labels.find_by(job_id: @job.id).destroy
      redirect_to jobs_path, notice: 'Job has been removed.'
    end
  end

  protected



  def set_role
    @role = Role.find params[:role_id] if params[:role_id]
  end

  def set_job
    @job = Job.find(params[:id])
  end

  def authenticate
    # https://www.owasp.org/index.php/Covert_timing_channel
    @authenticated = @job.secret == params[:secret]
  end

  def authorize
    raise ActionController::RoutingError.new 'Not Found' unless @authenticated
  end

  def job_params
    params.require(:job).permit(:id, :name, :role_id, :description, :starts_on, :ends_on, :location, :company_name, :contact_name, :contact_phone, :contact_email,:secret,:updated_at,:user_id, :job_filled)
  end


end
