class LabelsController < ApplicationController
  def index
    @users = User.all 
    # Find the labels that contain the selected role ids. There may be different users who have the same role_id
    @label = Label.select{|label| label.role_id == label_params[:role_id].to_i}

    respond_to do |format|
      # There may be different users who have the same role_id
      if @label.present? && @label.length > 1 
        # Scenario One: Filter labels that have the same user id
        # Note: when a user has the same roles in different unions, a new label is also created, which result in labels that have the same user id
        
        @labels_same_user_id = @label.uniq{|l|l.user_id}
        
        # Scenerio Two: Two job posts where user id are nil
        if @label.find_all{|l| l.user_id == nil }
          @filter_labels = @label.find_all{|l| l.user_id == nil }
          format.html{ render @users }
          format.json{ render json: {nil_user: @filter_labels, same_user_id: @labels_same_user_id}}
        end
        # Scenerio Three: have the same user id while for one label user id and job id exist
        format.html{ render @users }
        format.json{ render json: @filter_labels }
      elsif @label.present? && @label.length == 1
        format.html{render @users}
        format.json{render json: @label}
      else
        format.html{render @users}
        format.json{render json: "Labels not found",status: :no_content}
      end 

    end
  end


  private

  def label_params
    params.require(:label).permit(:user_id,:job_id,:role_id)
  end

end