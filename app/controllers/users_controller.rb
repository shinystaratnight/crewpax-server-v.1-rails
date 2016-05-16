class UsersController < ApplicationController
  # before_filter :set_role, only: :index
  respond_to :html, :json, :js
  # caches_page :index
  def index

    respond_to do |format|       
      if params[:page]== "0" || params[:page] == nil 
        @users = {};
        @total_user = User.all.length
        @paginated_users = User.limit(3)

        @paginated_user_info = @paginated_users.map{|user| 
          { user_info: user,
            union_member: user.eligibilities.find_all{|e| e.member == true}
                             .uniq{|u| u.union_id}
                             .map{|info| Union.find(info.union_id).name}.join(","),
            union_permit: user.eligibilities.find_all{|e| e.permit_days !=nil}
                              .uniq{|u| u.union_id}
                              .map{|info| {union_name: Union.find(info.union_id).name, permit_days: info.permit_days}},
            availabilities: user.appointments.find_all{|a| a.date >= Date.today}.map{|a| a.date}
          }}
        # => e.g [:user_info =>{name: }, :union_member => "DGC", :union_permit =>{union_name:  , permit_days:}, availabilities: []]
        
        @users = {total_user: @total_user, paginated_users:  @paginated_user_info}
        
        format.html
        # format.js 
        format.json{render json: @users}
      
      elsif params[:page].to_i % 3 == 2
        @users = {};
        @ajax_request_time = (params[:page].to_i + 1) / 3
        # @new_request_user_limit = (@ajax_request_time + 1) * 3 
        @paginated_users = User.limit(3).offset(@ajax_request_time * 3)
        #offset is for pagination, offset increases as page number goes up
        #User.limit(30).offset(@ajax_request_time * 30)
        @paginated_user_info = convert_user_info_json(@paginated_users)
        format.html{render :index} 
        format.json{render json: @paginated_user_info}
      end
    end
      # else 

      #   format.html{render :index}
      #   format.json{render json: @users}
 
     
      # if params[:page] % 3 == 2
      #   @ajax_request_time = (params[:page] + 1) / 3
      #   @new_request_user_limit = (@ajax_request_time + 1) * 3 
      #   @users = User.limit(@new_request_user_limit).offset(@ajax_request_time * 3)
      #   @paginated_users = @users.page(params[:page]).per(1)
      #   format.html{render :index}
      #   format.json{render json: @users }
      # else 
      #   format.html{render :index} 
      #   format.json{render json:@users}
      # end

      # if params[:current_page_number]=="0" || params[:current_page_number]== nil
      #   @users = User.limit(3)
      #   @paginated_users = @users.page(params[:page]).per(1)
      #   # format.js 
      #   format.html{render :index}
      #   # format.json{render json: @users}
        
      #   binding.pry 
      # elsif params[:current_page_number].present?
      #   current_page_number = params[:current_page_number].to_i
      #   @ajax_request_time = (current_page_number + 1) / 3
      #   @new_request_user_limit = (@ajax_request_time + 1) * 3 
      #   @users = User.limit(@new_request_user_limit).offset(@ajax_request_time * 3)
      #   format.html{render :index}
      #   format.json{render json: @users }
     
      # end
      
    #second ajax request User.limit(30).offset(30)
    # Filter out never login users
    # @already_signed_in_users = @users.find_all{|u| u.last_sign_in_at != nil}
    # @sorted_users = @already_signed_in_users.sort_by{|e| e[:last_sign_in_at]}.reverse 
    
  
      
    # end

    

    
    # # if user_params[:roles_ids].present?

    # # else
    # #   @users = User.all 

     
    # respond_to do |format|   
     
    #   if user_params[:roles_ids].present?        
    #     # @filter_users = Role.find(@role.id).users.uniq{|u|u.user_id}.find_all{|u|u.last_sign_in_at !=nil}
    #     #sort filter users based on their most recent log in         
    #     @most_recent_login_users =  @filter_users.sort_by{|e| e[:last_sign_in_at]}.reverse
    #     # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
    #     # @users = @most_recent_login_users.order(:name).page params[:page] 
    #     format.html {render @users}
    #     format.json {render json: @most_recent_login_users}        
    #   else
    #     # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
    #     # @users =  users.page(params[:page] || 1).per(6)
    #     # @users = User.order(:name).page params[:page] 
    #     format.html{render :index}
    #     format.json{render json: @sorted_users}
    #   end
    # end
    
      # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
        # @users =  @users.page(params[:page] || 1).per(6)
      # @users = User.order(:name).page params[:page]

    # if @role.present?
    #   @labels= Label.search_by_role(params[:role_id])
    # end
    # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
    # binding.pry 
    # @users_page = @users.page(params[:page] || 1).per(20)
  end

  def show
    @user = User.find params[:id]
    @appointments = @user.appointments.map{|a| a.date} 
    @eligibilities = @user.eligibilities
    unions = @user.unions
    @unions = unions.uniq{|union| union["id"]}
    @roles = @user.roles
    @certificates = @user.certificates    
    respond_to do |format|
    # start_date, a param will be changed if the user clicks on the 'previous'/ 'next'
    # button to view the other month
      if params[:start_date].present? 
        @start_date = params[:start_date]
        @date_range = @user.date_range(@start_date)       
        format.js
      else
        @start_date = @user.start_date
        @date_range = @user.date_range(@start_date)
        format.html{render :show}
      end
    end
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      # this is for carrierwave photo upload

      if user_params[:image].present?
        if Rails.env.production? #store images in dropbox
          @user.update(image: user_params[:image])
          client = dropbox_client 
          format.json{render json: @user}
        else
          @file = user_params[:image] #in development environment, store images locally
          @user.image = @file
          @user.save 
          format.json{render json: @user}
        end
      # this is to create label rows in labels table(joint table of user_id, role_id and job_id)
      elsif user_params[:roles_ids].present?
        @label = Label.new(role_id:user_params[:roles_ids][0], user_id:@user.id)
        if @label.save!
          format.json{render json: @label}
        end
      elsif @user.update_attributes(user_params)  
        format.html{ redirect_to @user}
        format.json{ render json: @user}
      else
        format.html{ render action: "edit"}
        format.json{ render json: @user.errors.full_messages, status: :unprocessable_entity}
      end
    end

  end
  
  def edit
    @user = User.find(params[:id])
    @addresses = @user.addresses 
    @user_unions = @user.unions 
    @unions = Union.all
    @roles = @user.roles
    @eligibilities = @user.eligibilities
    @user_certificates = @user.certificates
    @certificates = Certificate.all
    @certifiables = @user.certifiables

    @attachments = @user.attachments
  end






  def destroy
    @labels = Label.all 
    @user = User.find(params[:id])
    respond_to do |format|
      if user_params[:roles_ids].present? 
        @users_labels_without_job_posts = @labels.find_all{|l| l.role_id == user_params[:roles_ids][0].to_i && l.job_id==nil}
        # @label = Label.find_by(role_id:user_params[:roles_ids][0], user_id: @user.id) 
        @label = @users_labels_without_job_posts.detect{|l| l.user_id == @user.id}
        @label.destroy
        format.json{render json: @label, status: :no_content}
      else
        format.html{redirect_to @user}
      end
    end
  end


  # account_update_params = devise_parameter_sanitizer.sanitize(:account_update)
  
    # if account_update_params[:password].blank?
    #   account_update_params.delete 'password'
    #   account_update_params.delete 'password_confirmation'
    # end

    # if @user.update_attributes(account_update_params)
    #   update_label_with_user_role(@user)
    #   # sign_in @user, bypass: true
    #   set_flash_message :notice, :updated
    #   redirect_to after_update_path_for(@user)
    # else
    #   render :edit
    # end

  protected

  def convert_user_info_json(user)
    paginated_user_info = user.map{|user| 
      { user_info: user,
        union_member: user.eligibilities.find_all{|e| e.member == true}
                         .uniq{|u| u.union_id}
                         .map{|info| Union.find(info.union_id).name}.join(","),
        union_permit: user.eligibilities.find_all{|e| e.permit_days !=nil}
                          .uniq{|u| u.union_id}
                          .map{|info| {union_name: Union.find(info.union_id).name, permit_days: info.permit_days}},
        availabilities: user.appointments.find_all{|a| a.date >= Date.today}.map{|a| a.date}
      }}
    # => e.g [:user_info =>{name: }, :union_member => "DGC", :union_permit =>{union_name:  , permit_days:}, availabilities: 

  end

  def set_role
    @role = Role.find params[:role_id] if params[:role_id]
  end

  # To prevent Mass assignments.Require that :user be a key in the params Hash to accept various attributes
  def user_params     
    params.require(:user).permit( :name, :id, :image, :last_sign_in_at,:password, :password_confirmation,
            :email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle, 
            :admin, :phone,{roles_ids:[]})
   
  end
# { roles_ids:[]} 
  
  def label_params
    params.require(:label).permit(:user_id,:job_id,:role_id)
  end
  
  private

  def dropbox_client
    @dropbox_client ||= begin
    session = DropboxSession.new(ENV["APP_KEY"], ENV["APP_SECRET"])
    session.set_access_token( ENV["ACCESS_TOKEN"], ENV["ACCESS_TOKEN_SECRET"])
    DropboxClient.new(session, "app_folder")
    end
  end
 

     
end
