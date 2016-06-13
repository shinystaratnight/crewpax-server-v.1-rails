class LabelsController < ApplicationController
 
  def index
    @users = User.all 
    @jobs = Job.all 
    # Find the labels that contain the selected role ids. There may be different users who have the same role_id
    @label = Label.select{|label| label.role_id == label_params[:role_id].to_i}

    #Find labels that job ids exist to represent relationship between jobs and roles 
    @job_labels = @label.find_all{|object| object[:job_id].present? == true }
    #Firstly eliminate labels that users id are nil, secondly eliminate repreated user ids
    # Note: when a user has the same roles in different unions, a new label is also created, 
    #which result in labels that have the same user id        
    @user_labels = @label.find_all{|l| l.user_id != nil }.uniq{|l|l.user_id}

    respond_to do |format|
      if @user_labels.present? && label_params[:hiring_board] == "clicked"

        @filter_users = {};
        @users_with_selected_role = @user_labels.map{|l| User.find(l.user_id)}
        @total_user = @users_with_selected_role.length
        # select the first 30th elements of the array 

        if params[:current_page_number] == "1" || params[:current_page_number] == "0" 
          @users_with_selected_role = @users_with_selected_role[0..30]
          #@users_with_selected_role = @users_with_selected_role[0..3]
        else
          ajax_preload_request_time = (params[:current_page_number].to_i + 1) / 3

          # Page 2 => ajax_preload_request_time = 1
          #@users_with_selected_role = @users_with_selected_role[(ajax_preload_request_time) * 3 +1 .. (ajax_preload_request_time) * 3 +3]
          @users_with_selected_role = @users_with_selected_role[(ajax_preload_request_time) * 30 + 1 .. ajax_preload_request_time * 30 + 30 ]
        end

        if @users_with_selected_role == nil 
          @filter_users_info = ""        
        else
          @filter_users_info = @users_with_selected_role.map{|user| 
          {user_info: user,
          union_member: user.eligibilities.find_all{|e| e.member == true}
                            .uniq{|u| u.union_id}
                            .map{|info| Union.find(info.union_id).name}.join(","),
            union_permit: user.eligibilities.find_all{|e| e.permit_days !=nil}
                              .uniq{|u| u.union_id}
                              .map{|info| {union_name: Union.find(info.union_id).name, permit_days: info.permit_days}},
            availabilities: user.appointments.find_all{|a| a.date >= Date.today}.map{|a| a.date}
          }}

        end
        
        @filter_users = {number_users: @total_user, paginated_users:  @filter_users_info}

        format.json{render json: @filter_users}
     
      else
        format.json{render json: "Labels not found", status: :no_content}     
      end
    end
  end

  private

  def label_params
    params.require(:label).permit(:user_id,:job_id,:role_id,:job_board,:hiring_board)
  end

end