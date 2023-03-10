class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:update]
  # before_filter :set_role, only: :index
  respond_to :html, :json, :js

  # caches_page :index
  def index
    @user = User.find(1)     #doesn't matter which?

    respond_to do |format|

      # Adapted from show:
      # tw_start_date, a param will be changed if the user clicks on the 'previous'/ 'next'
      # button to view two weeks forward or back.
      if params[:tw_start_date].present?
        @tw_start_date = params[:tw_start_date].to_date
        @tw_date_range = @user.tw_date_range(@tw_start_date)

        format.js
      else
        @tw_start_date = @user.tw_start_date
        @tw_date_range = @user.tw_date_range(@tw_start_date)

        format.html{render :index}
      end

      # Old version with User.limit(30) and max 10 per page.
      # if params[:current_page_number] == "0" || params[:current_page_number] == nil
      #   @users = {};
      #   @total_user = User.all.length
      #   @paginated_users = User.limit(30)
      #   @paginated_user_info = convert_user_info_json(@paginated_users)
      #   @users = {number_users: @total_user, paginated_users:  @paginated_user_info}

      #   format.html
      #   format.json{render json: @users}

      # elsif params[:current_page_number].to_i % 3 == 2
      #   @users = {};
      #   @ajax_request_time = (params[:current_page_number].to_i + 1) / 3
      #   @paginated_users = User.limit(30).offset(@ajax_request_time * 30)
      #   @paginated_user_info = convert_user_info_json(@paginated_users)

      #   format.html
      #   format.json{render json: @paginated_user_info}
      # end

      # New version, all the users
      if params[:current_page_number] == "0" || params[:current_page_number] == nil
        @users = {};
        @total_user = User.all.length
        @paginated_users = User.all
        @paginated_user_info = convert_user_info_json(@paginated_users)
        @users = {number_users: @total_user, paginated_users:  @paginated_user_info}

        format.html
        format.json{render json: @users}

      elsif params[:current_page_number].to_i % 3 == 2
        @users = {};
        @ajax_request_time = (params[:current_page_number].to_i + 1) / 3
        @paginated_users = User.all.offset(@ajax_request_time * User.all.length)
        @paginated_user_info = convert_user_info_json(@paginated_users)

        format.html
        format.json{render json: @paginated_user_info}
      end


    end

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

          # #in production environment, store image info (for url)
          # @file = user_params[:image]
          # @user.image = @file
          # @user.save
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
        @label = @users_labels_without_job_posts.detect{|l| l.user_id == @user.id}
        @label.destroy
        format.json{render json: @label, status: :no_content}
      else
        format.html{redirect_to @user}
      end
    end
  end


  def search
    respond_to do |format|
      @users = {}
      if params[:has_vehicle] == "true"
        if params[:role_id] == nil || params[:role_id].empty?
          users_with_vehicle = User.all.find_all{|user| user.has_vehicle == true}
          filter_and_paginate(users_with_vehicle)
          @users = {number_users: @number_users,
                    paginated_users: @paginated_user_info ,
                    sorting_params:"has_vehicle",
                    role_id: ""
                    }

          format.html
          format.json{render json: @users}
        else
          users_with_vehicle = Role.find(params[:role_id].to_i)
                                    .users
                                    .uniq{|u| u.id}
                                    .find_all{|user| user.has_vehicle == true }

          filter_and_paginate(users_with_vehicle)

          @users = {number_users: @number_users,
                    paginated_users: @paginated_user_info,
                    sorting_params:"has_vehicle",
                    role_id: params[:role_id]
                  }

          format.html
          format.json{render json: @users}
        end
      end

      if params[:union_member] == "true"
        if params[:role_id] == nil || params[:role_id].empty?
          users = Eligibility.all
                                 .find_all{|e| e.member==true && e.user_id != nil}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}

          filter_and_paginate(users)
          @users = {number_users: @number_users,
                    paginated_users: @paginated_user_info ,
                    sorting_params:"union_member",
                    role_id: ""
                    }

          format.html
          format.json{render json: @users}
        else
          users = Eligibility.all
                             .find_all{|e| e.member == true && e.user_id != nil && e.role_id == params[:role_id].to_i}
                             .uniq{|u| u.user_id}
                             .map{|e| User.find(e.user_id)}

          filter_and_paginate(users)
          @users = {number_users: @number_users,
                    paginated_users: @paginated_user_info ,
                    sorting_params:"union_member",
                    role_id: params[:role_id]
                    }

          format.html
          format.json{render json: @users}
        end
      end

      if params[:union_permit] == "true"
        if params[:role_id] == nil || params[:role_id].empty?
          users = Eligibility.all
                             .find_all{|e| e.permit_days !=nil && e.user_id != nil}
                             .uniq{|u| u.user_id}
                             .map{|e| User.find(e.user_id)}

          filter_and_paginate(users)
          @users = {number_users: @number_users,
                    paginated_users: @paginated_user_info ,
                    sorting_params:"union_permit",
                    role_id: ""
                    }

          format.html
          format.json{render json: @users}
        else
          users = Eligibility.all
                             .find_all{|e| e.permit_days != nil && e.user_id != nil && e.role_id == params[:role_id].to_i}
                             .uniq{|u| u.user_id}
                             .map{|e| User.find(e.user_id)}


          filter_and_paginate(users)
          @users = {number_users: @number_users,
                    paginated_users: @paginated_user_info ,
                    sorting_params:"union_permit",
                    role_id: params[:role_id]
                    }

          format.html
          format.json{render json: @users}
        end


      end
    end
  end


  def sort
    respond_to do |format|
      @users = {}
      @total_user = User.all.length

      if params[:availability] == "most_recent"
        if params[:filter_element].present?
          if params[:filter_element][:query] == "has_vehicle"
            if params[:role_id].present?

              users = Role.find(params[:role_id].to_i).users
                                                 .uniq{|u| u.id}
                                                 .find_all{|user| user.has_vehicle == true}
              sort_and_paginate_available_user(users)

              @users = { number_users: @number_users_available,
                         paginated_users: @users_info,
                         sorting_params: "availability",
                         role_id: params[:role_id],
                         filter_element: {query: "has_vehicle"}
                        }

              format.html
              format.json{render json: @users }

            else
              sort_and_paginate_available_user(User.all.find_all{|user| user.has_vehicle == true})
              @users= {number_users: @number_users_available,
                       paginated_users: @users_info,
                       sorting_params: "availability",
                       role_id: "",
                       filter_element: {query: "has_vehicle"}
                      }

              format.html
              format.json{render json: @users }
            end
          elsif params[:filter_element][:query] == "union_member"
            if params[:role_id].present?

              users = Eligibility.all
                                 .find_all{|e| e.member == true && e.user_id != nil && e.role_id == params[:role_id].to_i}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}

              sort_and_paginate_available_user(users)
              @users= { number_users: @number_users_available,
                        paginated_users: @users_info,
                        sorting_params: "availability",
                        role_id: params[:role_id],
                        filter_element: {query: "union_member"}
                      }

              format.html
              format.json{render json: @users }

            else
              users = Eligibility.all
                                 .find_all{|e| e.member==true && e.user_id != nil}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}

              sort_and_paginate_available_user(users)
              @users= {number_users: @number_users_available,
                       paginated_users: @users_info,
                       sorting_params: "availability",
                       role_id: "",
                       filter_element: {query: "union_member"}
                      }

              format.html
              format.json{render json: @users }
            end
          elsif params[:filter_element][:query] == "union_permit"
            if params[:role_id].present?
              users = Eligibility.all
                                 .find_all{|e| e.permit_days != nil && e.user_id != nil && e.role_id == params[:role_id].to_i}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}

              sort_and_paginate_available_user(users)
              @users= {number_users: @number_users_available,
                       paginated_users: @users_info,
                       sorting_params: "availability",
                       role_id: params[:role_id],
                       filter_element: {query: "union_permit"}
                      }

              format.html
              format.json{render json: @users }
            else
              users = Eligibility.all
                                 .find_all{|e| e.permit_days !=nil && e.user_id != nil}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}

              sort_and_paginate_available_user(users)

              @users= { number_users: @number_users_available,
                       paginated_users: @users_info,
                       sorting_params: "availability",
                       role_id: "",
                       filter_element: {query:"union_permit" }
                      }

              format.html
              format.json{render json: @users }
            end
          end
        elsif params[:role_id].present?

          users = Role.find(params[:role_id].to_i).users.uniq{|u| u.id}
          sort_and_paginate_available_user(users)

          @users= {number_users: @number_users_available,
                   paginated_users: @users_info,
                   sorting_params: "availability",
                   role_id: params[:role_id],
                   filter_element: "" }

          format.html
          format.json{render json: @users }

        else
          #some users never log in
          users =  User.all.find_all{|user| user.last_sign_in_at != nil}
          sort_and_paginate_available_user(users)
          @users= {number_users: @number_users_available,
                   paginated_users: @users_info,
                   sorting_params: "availability",
                   role_id: "",
                   filter_element:"" }

          format.html
          format.json{render json: @users}
        end
      end


      if params[:last_log_in]== "most_recent"
        if params[:filter_element].present?
          if params[:filter_element][:query] == "has_vehicle"
            if params[:role_id].present?
              users = Role.find(params[:role_id].to_i).users
                                                 .uniq{|u| u.id}
                                                 .find_all{|user| user.has_vehicle == true}
                                                 .find_all{|user| user.last_sign_in_at != nil }
              sort_and_paginate_last_log_in_user(users)
              @users ={number_users: @number_users,
                       paginated_users: @users_with_last_log_in,
                       sorting_params: "last_log_in",
                       role_id: params[:role_id],
                       filter_element: {query: "has_vehicle"}
                      }

              format.html
              format.json{render json: @users }
            else
              users =  User.all.find_all{|user| user.has_vehicle == true && user.last_sign_in_at != nil }
              sort_and_paginate_last_log_in_user(users)
              @users ={number_users: @number_users,
                       paginated_users: @users_with_last_log_in,
                       sorting_params: "last_log_in",
                       role_id: "",
                       filter_element: {query: "has_vehicle"}
                       }
              format.html
              format.json{render json: @users }
            end
          elsif params[:filter_element][:query] == "union_member"
            if params[:role_id].present?
              users = Eligibility.all
                                 .find_all{|e| e.member == true && e.user_id != nil && e.role_id == params[:role_id].to_i}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}
                                 .find_all{|user| user.last_sign_in_at != nil }

              sort_and_paginate_last_log_in_user(users)
              @users ={number_users: @number_users,
                       paginated_users: @users_with_last_log_in,
                       sorting_params: "last_log_in",
                       role_id: params[:role_id],
                       filter_element: {query: "union_member"}
                      }

              format.html
              format.json{render json: @users }

            else
              users = Eligibility.all
                                 .find_all{|e| e.member==true && e.user_id != nil}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}
                                 .find_all{|user| user.last_sign_in_at != nil }

              sort_and_paginate_last_log_in_user(users)
              @users = {number_users: @number_users,
                        paginated_users: @users_with_last_log_in,
                        sorting_params: "last_log_in",
                        role_id: "",
                        filter_element: {query: "union_member"}
                       }

              format.html
              format.json{render json: @users }
            end
          elsif params[:filter_element][:query] == "union_permit"
            if params[:role_id].present?
              users = Eligibility.all
                               .find_all{|e| e.permit_days != nil && e.user_id != nil && e.role_id == params[:role_id].to_i}
                               .uniq{|u| u.user_id}
                               .map{|e| User.find(e.user_id)}
                               .find_all{|user| user.last_sign_in_at != nil }
              sort_and_paginate_last_log_in_user(users)
              @users = {number_users: @number_users,
                        paginated_users: @users_with_last_log_in,
                        sorting_params: "last_log_in",
                        role_id: params[:role_id],
                        filter_element: {query: "union_permit"}
                        }

              format.html
              format.json{render json: @users }
            else
              users = Eligibility.all
                                 .find_all{|e| e.permit_days !=nil && e.user_id != nil}
                                 .uniq{|u| u.user_id}
                                 .map{|e| User.find(e.user_id)}
                                 .find_all{|user| user.last_sign_in_at != nil }

              sort_and_paginate_last_log_in_user(users)
              @users = {number_users: @number_users,
                       paginated_users: @users_with_last_log_in,
                       sorting_params: "last_log_in",
                       role_id: "",
                       filter_element: {query: "union_permit"}
                     }

              format.html
              format.json{render json: @users }
            end
          end
        elsif params[:role_id].present?
          users = Role.find(params[:role_id].to_i)
                      .users
                      .uniq{|u| u.id}
                      .find_all{|user| user.last_sign_in_at != nil }
          sort_and_paginate_last_log_in_user(users)

          @users = {number_users: @number_users,
                    paginated_users: @users_with_last_log_in,
                    sorting_params: "last_log_in",
                    role_id: params[:role_id],
                    filter_element: ""
                   }

          format.html
          format.json{render json: @users}
        else

          #some users never log in
          users =  User.all.find_all{|user| user.last_sign_in_at != nil}
          sort_and_paginate_last_log_in_user(users)

          @users = {number_users: @number_users,
                    paginated_users: @users_with_last_log_in,
                    sorting_params: "last_log_in",
                    role_id: "",
                    filter_element:""
                   }
          format.html
          format.json{render json: @users}
        end
      end
    end
  end


  protected


  def convert_user_info_json(user)
    paginated_user_info = user.map{|user|
      { user_info: user,
        union_member: user.eligibilities.find_all{|e| e.member == true}
                         .uniq{|u| u.union_id}
                         .map{|info| Union.find(info.union_id).name}.join(" , "),

        union_permit: user.eligibilities.find_all{|e| e.permit_days !=nil}
                          .uniq{|u| u.union_id}
                          .map{|info| {union_name: Union.find(info.union_id).name, permit_days: info.permit_days}},
        availabilities: user.appointments.find_all{|a| a.date != nil && a.date >= Date.today}.map{|a| a.date} # nil added for now
      }}
    # => e.g [:user_info =>{name: }, :union_member => "DGC", :union_permit =>{union_name:  , permit_days:}, availabilities:

  end


  def filter_and_paginate(user)
    @number_users = user.length
    if params[:current_page_number] == "1" || params[:current_page_number]== "0"
      users_result = user[0..30]
    else
      ajax_preload_request_time = (params[:current_page_number].to_i + 1) / 3
      # Page 2 => ajax_preload_request_time = 1
      users_result = user[(ajax_preload_request_time) * 30 + 1 .. (ajax_preload_request_time) * 30 + 30 ]
    end

    @paginated_user_info = convert_user_info_json(users_result)

  end

  def sort_and_paginate_available_user(user)
    users = convert_user_info_json(user)
    # Find users who are available today in dates after today
    @users_available = users.find_all{|user| user[:availabilities] !=[]}
    @number_users_available = @users_available.length
    # sort users based on their most recent availabilities
    @users_info = @users_available.sort_by{|user| user[:availabilities].sort_by{|date| date}}
    #pagination sorted result
    if params[:current_page_number] == "1" || params[:current_page_number]== "0"
      @users_info = @users_info[0..30]
    else
      ajax_preload_request_time = (params[:current_page_number].to_i + 1) / 3
      # Page 2 => ajax_preload_request_time = 1
      @users_info= @users_info[(ajax_preload_request_time) * 30 + 1 .. (ajax_preload_request_time) * 30 + 30 ]
    end
  end


  def sort_and_paginate_last_log_in_user(user)
    users = convert_user_info_json(user)
    #Sort users based on most sign in
    @users_with_last_log_in = users.sort_by{|user| user[:user_info].last_sign_in_at}.reverse
    @number_users = @users_with_last_log_in.length
    #pagination sorted result
    if params[:current_page_number] == "1" || params[:current_page_number]== "0"
      @users_with_last_log_in = @users_with_last_log_in[0..30]
    else
      ajax_preload_request_time = (params[:current_page_number].to_i + 1) / 3
      # Page 2 => ajax_preload_request_time = 1
      @users_with_last_log_in = @users_with_last_log_in[(ajax_preload_request_time) * 30 + 1 .. ajax_preload_request_time * 30 + 30 ]
    end

  end


  def set_role
    @role = Role.find params[:role_id] if params[:role_id]
  end

  # To prevent Mass assignments.Require that :user be a key in the params Hash to accept various attributes
  def user_params
    params.require(:user).permit( :name, :id, :image, :last_sign_in_at,:password, :password_confirmation,
            :email, :image_cache, :is_dgc_member, :has_traffic_control_ticket, :has_vehicle,
            :admin, :phone, :imdb, :youtube, :vimeo, :linkedin, :facebook, :notify_when_job_posted, {roles_ids:[]})

  end


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
