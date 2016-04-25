$(function(){
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
          $(".user-card").hide();
          $("#label_not_found").text("Users not found.").show().delay(3000).fadeOut(1000);
        }else{
          $('.user-card').hide()
          $.map ($(response),function(resp){          
            var user_id = resp.user_id.toString();            
            $('.user-card[data-user-id='+ user_id+']').show();
          });
        }
      }
    });

  });



  

});

 
