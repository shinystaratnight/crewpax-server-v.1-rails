class JobsController < ApplicationController
  before_filter :set_job, :authenticate, only: [:show, :edit, :update, :destroy]
  before_filter :authorize, only: [ :edit, :update, :destroy]
  before_filter :set_role, only: :index
  respond_to :html, :js, :json
  
  def index
    #scope will return false b/c in jobs table, :published filed is set default 
    #to be false
    @jobs = Job.published 
    @jobs.find_most_recent(params[:updated_at]) 
    
      
      if params[:search_content].present? 
        respond_to do |format|        
          if job_params[:role_id].present?
            @filter_jobs = Role.find(job_params[:role_id]).jobs.search_location(params[:search_content].titleize)
            # format.html{render @jobs}
            format.json{render json: @filter_jobs}
          else
            @jobs = Job.published.search_location(params[:search_content].titleize)
            # format.html{render @jobs}
            format.json{render json: @jobs}
          end
        end    
      end
  
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
      binding.pry 
    if current_user.present?
      @job.user_id = current_user.id
    end  
    if @job.save      
      JobMailer.confirmation(@job).deliver_now
      redirect_to jobs_path, notice: 'Confirmation email has been sent.'
    else
      render :new
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
    @authenticated = user_signed_in? || @job.secret == params[:secret] # https://www.owasp.org/index.php/Covert_timing_channel
  end

  def authorize
    raise ActionController::RoutingError.new 'Not Found' unless @authenticated
  end

  def job_params
    params.require(:job).permit(:id, :name, :role_id, :description, :starts_on, :ends_on, :location, :company_name, :contact_name, :contact_phone, :contact_email,:secret,:updaetd_at,:user_id)
  end

 
end
