$(function(){
//=============When the page is loaded, Using Ajax to pre load 3 users========================================================================  
  // When the Page is load, preload first 30 users
  var current_page_number = $(location).attr("search").match(/\d+/)
  current_page_number == null ? current_page_number = 0 : current_page_number = current_page_number[0]
  console.log("current_page_number:", current_page_number)
  // preloadUser();
  // When a user is on the 2nd, 5th, 7th +++ page, send another ajax request to preload the next 30 users info
  if (current_page_number == 0){
    preloadUser(); 
  } 

  // else if (current_page_number % 3 == 2){
  //   preloadUser(current_page_number);
  // }

  $(".next").on("click", function(){
    alert("button clicked")
  })


  // else if (current_page_number % 3 == 2){
  //   // var preload_time = (current_page_number + 1) / 3
  //   debugger
  //   preloadUser(current_page_number);
  // }
  





//=============================Search Employees with given roles=========================================  
  // $("#user_role, #select_user_role").on("change",function(){

  //   var role_id = $(this).val();
  // // when the selection is all  
  //   if (role_id == 0){
  //     $(".user-card").show();
  //     return false;
  //   }else{
  //     $(this).data("selected-user-role", "clicked")
  //     var hiring_board_status = $(this).data("selected-user-role");
  //     //User ajax to get the user_id 
  //     $.ajax({
  //       url: "/roles/" + role_id + "/labels",
  //       method: "get",
  //       dataType: "json",
  //       data:{label:{role_id: role_id, hiring_board: hiring_board_status}},
  //       success: function(response){    
  //         if (response == undefined){  
  //           UserNotFound(); 
  //           $("#user_role").data("selected-user-role", "");
  //           $("#most_recent_log_in > a").data("selected-role-id", "")
  //           console.log("response undefined selected role id:",  $("#most_recent_log_in > a").data("selected-role-id"))
  //         }else{
  //           $('.user-card').hide();
  //           $("#user_role").data("selected-user-role", "");
  //           // Need to add a scenario when response number is more than 1 and one of the responses is a job post 
  //           // Do something
  //           var user_card;
  //           var i = 0;
  //             $.map($(response),function(resp){
  //             // If a job id exist, this label is job_label not user_label
                 
  //               if(resp.job_id == null){
                 
  //                 // i += 1

  //                 // //Reset data order value
  //                   $('.user-card[data-user-id='+ resp.user_id+']').data("order", "");
  //                   var user_first = $('.user-card[data-user-id='+ resp.user_id+']').data("order", i);
  //                  debugger
  //                   $(user_first).after($(".user-card[data-order='']")).show()
                                       
  //               }else{                
  //                 UserNotFound();
  //               }
                
  //             });



  //             //Reset selected role id first
  //             $("#most_recent_log_in > a").data("selected-role-id", "")
  //             $("#most_recent_log_in > a").data("selected-role-id", response[0].role_id)
  //             console.log("response exists selected role id:",  $("#most_recent_log_in > a").data("selected-role-id"))
  //         }
      
  //       }
  //     });
  //   }
  // });
  
  // $("#user_role").on("change",function(){
  //   var role_id = $(this).val();  
  //  // when the selection is all  
  //   if (role_id == 0){
  //     $(".user-card").show();
  //     return false;
  //   }else{
  //     $(this).data("selected-user-role", "clicked")
  //     var hiring_board_status = $(this).data("selected-user-role");
  //     //User ajax to return user id with scope 
  //     console.log("hiring_board status:", hiring_board_status)
  //      console.log("roles ids:", role_id)
  //     $.ajax({
  //       url: "/users",
  //       method: "get",
  //       dataType: "json",
  //       data:{role_id:role_id},

  //       success: function(response){    
        
  //       }
  //     });
  //   }

  // })

//==================================Sort Employees by Last Sign in ========================================================
  $("#most_recent_log_in > a").on("click", function(event){
    event.preventDefault();
    // var roles_ids = [];
    // roles_ids.push($(this).data("selected-role-id"));
    var last_sign_in_at = "most_recent"
    var role_id = $(this).data("selected-role-id")
    if(role_id == ""){
      var user_data = {last_sign_in_at: last_sign_in_at}
      sortUser(user_data);
    }else{
      var user_data = {role_id:role_id, last_sign_in_at:last_sign_in_at};
      sortUser(user_data);
    }
    
  });


//=========================================================================================================
  

});

//======================================Common function====================================================
  function preloadUser(){
    $.ajax({
      url: "/users",
      method: "get",
      dataType: "json",
      // data:{current_page_number:current_page_number},
      success: function(response){
        console.log("response:", response)
        var template = $("#user_card_template").html();
        var templateScript = Handlebars.compile(template);
        var users = {
          users: [
            {"name" : response[0].name,"phone": response[0].phone, "path" : "users/" + response[0].id},
            {"name" : response[1].name, "phone": response[1].phone,"path" : "users/" + response[1].id },
            {"name" : response[2].name,"phone": response[2].phone, "path" : "users/" + response[2].id}
          ]
        }
        console.log("users content:", users)
        var html = templateScript(users);      
        $("#user-list").append(html)
        
       

      }
    });

  }


  function UserNotFound(){
    $(".user-card").hide();
    $("#label_not_found").text("Users not found.").show().delay(3000).fadeOut(1000);
  }


  function sortUser(data){
    $.ajax({
        url:"/users",
        method: "get",
        dataType: "json",
        data: data,
        success: function(response){         
          if(response == undefined || $.isEmptyObject(response)){
            UserNotFound();          
          }else{
            $('.user-card').hide();
            var length = response.length;
            var user_card;
            for (i = 0; i < length; i++){              
              // First reset data -index value
              $('.user-card[data-user-id='+ response[i].id+']').data("order", "");
              $('.user-card[data-user-id='+ response[i].id+']').data("order", i);
              console.log("user-card data index",$('.user-card[data-user-id='+ response[i].id+']').data("order" ));              
              $('.user-card[data-user-id='+ response[i].id+']').show().insertAfter(user_card);
              var user_card = $('.user-card[data-user-id='+ response[i].id+']');
            }
          }
        } 
    });
  }

  