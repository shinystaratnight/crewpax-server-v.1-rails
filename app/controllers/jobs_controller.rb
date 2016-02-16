class JobsController < ApplicationController
  before_filter :set_job, :authenticate, only: [:show, :edit, :update, :destroy]
  before_filter :authorize, only: [:edit, :update, :destroy]
  before_filter :set_category, only: :index

  def index
    scope = Job.published
    if @category.present?
      scope.where! category_id: @category.id
    end
    @jobs = scope.page(params[:page] || 1).per(20)
  end

  def new
    @job = Job.new
  end

  def create
    @job = Job.new job_params
    if @job.save
      JobMailer.confirmation(@job).deliver
      redirect_to jobs_path, notice: 'Confirmation email has been sent.'
    else
      render :new
    end
  end

  def show
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

  def set_category
    # @category = Category.find params[:category_id]
  end

  def set_job
    @job = Job.find params[:id]
  end

  def authenticate
    @authenticated = @job.secret == params[:secret]
  end

  def authorize
    raise ActionController::RoutingError.new 'Not Found' unless @authenticated
  end

  def job_params
    params.require(:job).permit :name, :category_id, :description, :starts_on, :ends_on, :location, :company_name, :contact_name, :contact_phone, :contact_email
  end
end
