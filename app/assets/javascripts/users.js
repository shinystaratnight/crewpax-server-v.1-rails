$(function(){
//=============================Search Employees with given roles=========================================  
  $("#user_role, #select_user_role").on("change",function(){
    var role_id = $(this).val();
  // when the selection is all  
    if (role_id == 0){
      $(".user-card").show();
      return false;
    }else{
      $(this).data("selected-user-role", "clicked")
      var hiring_board_status = $(this).data("selected-user-role");
      //User ajax to get the user_id 
      $.ajax({
        url: "/roles/" + role_id + "/labels",
        method: "get",
        dataType: "json",
        data:{label:{role_id: role_id, hiring_board: hiring_board_status}},
        success: function(response){    
          if (response == undefined){  
            UserNotFound(); 
            $("#user_role").data("selected-user-role", "");
            $("#most_recent_log_in > a").data("selected-role-id", "")
            console.log("response undefined selected role id:",  $("#most_recent_log_in > a").data("selected-role-id"))
          }else{
            $('.user-card').hide();
            $("#user_role").data("selected-user-role", "");
            debugger
            $.map($(response),function(resp){ 
             
              $('.user-card[data-user-id='+ resp.user_id+']').show();
            });
              //Reset selected role id first
              $("#most_recent_log_in > a").data("selected-role-id", "")
              $("#most_recent_log_in > a").data("selected-role-id", response[0].role_id)
              console.log("response exists selected role id:",  $("#most_recent_log_in > a").data("selected-role-id"))
          }
      
        }
      });
    }
  });


//==================================Sort Employees by Last Sign in ========================================================
  $("#most_recent_log_in > a").on("click", function(event){
    event.preventDefault();
    // var roles_ids = [];
    // roles_ids.push($(this).data("selected-role-id"));
    var last_sign_in_at = "most_recent"
    var role_id = $(this).data("selected-role-id")
    $.ajax({
      url:"/users",
      method: "get",
      dataType: "json",
      data:{role_id: role_id, last_sign_in_at: last_sign_in_at},
      success: function(response){
        debugger
        if(response == undefined){
          UserNotFound
        }else{
          $('.user-card').hide();
          $.map($(response),function(resp){ 
            $('.user-card[data-user-id='+ resp.id+']').show().insertBefore(".filter_result");
          });
        }
      } 
    })
    


  });


//=========================================================================================================
  

});

//======================================Common function====================================================
  function UserNotFound(){
    $(".user-card").hide();
    $("#label_not_found").text("Users not found.").show().delay(3000).fadeOut(1000);
  }









