$(function(){
//=============================Search Employees with given roles=========================================  

  $("#user_role, #select_user_role").on("change",function(){
    var role_id = $(this).val();
  // when the selection is all  
    if (role_id == 0){
      $(".user-card").show();
      return false;
    }
    //User ajax to get the user_id 
    $.ajax({
      url: "/roles/" + role_id + "/labels",
      method: "get",
      dataType: "json",
      data:{label:{role_id: role_id}},
      success: function(response){    
        if (response == undefined){  
          UserNotFound(); 
        }else if(response.length > 1){
          $('.user-card').hide();
          $.map ($(response),function(resp){ 
            if (resp.user_id > 0 ) {       
              var user_id = resp.user_id.toString();            
              $('.user-card[data-user-id='+ user_id+']').show();
            } 
          });
        }else{
          if (response[0].user_id==null){
            UserNotFound(); 
          }
          
        }
      }
    });

  });


//==================================Sort Employees by Last Sign in ========================================================
  // $("#most_recent_log_in").on("click", function(event){
  //   event.preventDefault();
  //   $.ajax({
  //     url:"/users",
  //     method: "get",
  //     dataType: "json",
  //     data:{user{last_sign_in_at: last_sign_in_at}},
  //     success: function(response){

  //     } 
  //   })
    


  // });



  

});

//======================================Common function====================================================
  function UserNotFound(){
    $(".user-card").hide();
    $("#label_not_found").text("Users not found.").show().delay(3000).fadeOut(1000);
  }









