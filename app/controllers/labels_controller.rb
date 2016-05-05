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
      if @job_labels.present? && label_params[:job_board ] == "clicked"
          format.html{redirect_to jobs_path}
          format.json{render json: @job_labels}

      elsif @user_labels.present? && label_params[:hiring_board] == "clicked"
          # Kaminari.paginate_array(@users).page(params[:page] || 1).per(20)
 
          user_ids = @user_labels.map{|l| l.user_id}
      
          @users = User.where(:id => user_ids)
          # @users = @user_labels.map{|l| User.find(l.user_id)}
          # user_ids = @user_labels.map{|l| l.user_id}
          # binding.pry 
          @users =  @users.page(params[:page]).per(6)
          format.html{render @users}
          format.json{render json: @user_labels} 
      else
        format.json{render json: "Labels not found", status: :no_content}
     
      end

    end

  end



  # respond_to do |format|
    #   if @user_labels.present? && label_params[:hiring_board] == "clicked"
    #     format.html{redirect_to users_path}
    #     format.json{render json: @user_labels }
    #   end

    # end

 # else
      #   format.html{redirect_to jobs_path}
      #   format.json{render json:"Labels not found", status: :no_content}
          # format.json{render json: {job_labels: @job_labels, user_labels: @user_labels}}
        
        # elsif label_params[:hiring_board] == "clicked"
        #   format.html{render :show}
        #   format.json{render json: @user_labels} 
        # else
        #   format.json{render json: "Labels not found", status: :no_content}

        # if label_params[:hiring_board] == "clicked"
        #   format.html{redirect_to users_path}
        #   format.json{render json: @user_labels} 
        # else
        #   format.html{redirect_to users_path}     
        #   format.json{render json:"Labels not found",status: :no_content} 
        # end
      
    

      #   format.json{render json:"Labels not found",status: :no_content }} 









 





#     respond_to do |format|
#       if @label.present? && @label.length > 1 
# #==========For showing relationships between roles and jobs(Case One: user id nil) ======================================
#         if @label.find_all{|l| l.user_id == nil } #Find out all the job_labels
#           @job_labels = @label.find_all{|l| l.user_id == nil }
#           format.html{render @jobs}
#           format.json{render json: {job_labels_nil_user: @job_labels, user_labels_same_user_id: nil}
#         else
#         end



# #============For showing relationship between roles and users============================================
#         # There may be different users who have the same role_id
#         # Scenario One: Filter labels that have the same user id
#        
#         @labels_same_user_id = @label.uniq{|l|l.user_id}
        
#         # Scenerio Two: Two job posts where user id are nil
#         if @label.find_all{|l| l.user_id == nil }
#           @filter_labels = @label.find_all{|l| l.user_id == nil }
#           format.html{ render @users }
#           format.json{ render json: {nil_user: @job_labels, same_user_id: @labels_same_user_id}}
#         end
#         # Scenerio Three: have the same user id while for one label user id and job id exist
#         format.html{ render @users }
#         format.json{ render json: @filter_labels }
#       elsif @label.present? && @label.length == 1
#         format.html{render @users}
#         format.json{render json: @label}
#       else
#         format.html{render @users}
#         format.json{render json: "Labels not found",status: :no_content}
#       end 

#     end
  


  private

  def label_params
    params.require(:label).permit(:user_id,:job_id,:role_id,:job_board,:hiring_board)
  end

end