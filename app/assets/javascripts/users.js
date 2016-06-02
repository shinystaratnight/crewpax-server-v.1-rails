$(function(){
//=============When the page is loaded, Using Ajax to pre load 3 users========================================================================  
  // When the Page is load, preload first 30 users
  var data = [];  
  var current_page_number = $(location).attr("search").match(/\d+/)
  current_page_number == null ? current_page_number = 0 : current_page_number = current_page_number[0]
  console.log("current_page_number:", current_page_number)
  
  var opts = {
    pageMax: 10,
    postsDiv: $('#user-list'),

  }


  if (current_page_number == 0){
    var url = "/users"
    var role_id = "";
    var current_page = current_page_number
    var hiring_board_status = ""
    var ajax_request_data = {current_page_number: current_page}
    ajaxPreLoadUser(opts, data, role_id, current_page, hiring_board_status, url, ajax_request_data)
  
  }



//=============================Search Employees with given roles inside $(function)=========================================  
  $("#user_role").on("change",function(){
    var role_id = $(this).val();
    console.log("selected role id:", role_id)

  // when the selection is all  
    if (role_id == 0){
      $(".user-card").show();
      console.log("selected all")
      return false;
    }else{
      $(this).data("selected-user-role", "clicked")
      var hiring_board_status = $(this).data("selected-user-role");
      var current_page = $(".pagination-page").data("page")
      console.log("current page to send to label controller:", current_page)
      var filter_data = [];
      var url = "/roles/" + role_id + "/labels"
      var ajax_request_data = {label:{role_id: role_id, hiring_board: hiring_board_status}, current_page_number: current_page}
     
      ajaxPreLoadUser(opts, filter_data, role_id, current_page, hiring_board_status, url, ajax_request_data)

    }
    
  });

//==========================Filter Crews by (Vehicle/Union Member/Union Permit) ========================================================
  $("#has_a_vehicle > a, #union_member > a, #union_permit > a").on("click", function(event){
    event.preventDefault();
    var current_page_number = $(".pagination-page").data("page")
    var role_id = $("#user_role option:selected").val()
    var filter_user_data = [];
    var hiring_board_status = ""   
    var url = "/users/search"
    var user_data;

    if($(this).text() == "Has a Vehicle"){
      markFilterparams("has_a_vehicle");
      if(role_id == ""){
        user_data = {has_vehicle: true, current_page_number: current_page_number}
      }else{
        user_data = {role_id:role_id, has_vehicle:true, current_page_number: current_page_number};
      }
    }else if($(this).text() == "Union Status: Member"){
      markFilterparams("union_member");
      if(role_id == ""){
        user_data = {union_member: true, current_page_number: current_page_number} 
      }else{
        user_data = {role_id:role_id, union_member: true, current_page_number: current_page_number}
      }
    }else if($(this).text() == "Union Status: Permit"){
      markFilterparams("union_permit");
      if(role_id == ""){
        user_data = {union_permit: true, current_page_number: current_page_number}
      }else{
        user_data = {role_id:role_id, union_permit: true, current_page_number: current_page_number};
      }
    }


    ajaxPreLoadUser(opts, filter_user_data, role_id, current_page_number, hiring_board_status, url, user_data)

  });  


  
//=========================================================================================================
  $("#available_soon > a, #most_recent_log_in > a").on("click", function(event){
    event.preventDefault();
    var current_page_number = $(".pagination-page").data("page")
    var role_id = $("#user_role option:selected").val()
    var user_available_data =[];
    var hiring_board_status = "";
    var url = "/users/sort";

    if($("#has_a_vehicle").data("clickable")=="clicked"){
      var filter_element = {query: "has_vehicle"}
    }else if($("#union_member").data("clickable")=="clicked"){
      var filter_element = {query: "union_member"}
    }else if($("#union_permit").data("clickable")=="clicked"){
      var filter_element = {query: "union_permit"}
    }else{
      var filter_element = ""
    }
     

    if(role_id == ""){
      // Nothing is being filtered      
      if($(this).data("availability") == "most_recent"){
        var user_data = {current_page_number: current_page_number, availability: "most_recent",filter_element:filter_element}
      }else if($(this).data("last-log-in") == "most_recent"){
        var user_data = {current_page_number: current_page_number, last_log_in: "most_recent",filter_element:filter_element}
      }
          
    }else{  
      if($(this).data("availability") == "most_recent"){
        var user_data = {current_page_number: current_page_number, availability: "most_recent", role_id: role_id, filter_element:filter_element}
      }else if($(this).data("last-log-in") == "most_recent"){
        var user_data = {current_page_number: current_page_number, last_log_in: "most_recent", role_id: role_id, filter_element:filter_element}
      }
     
    }

    ajaxPreLoadUser(opts, user_available_data, role_id, current_page_number, hiring_board_status, url, user_data)

  })




//==============================Handlebars Register Helper method===============================================================
  Handlebars.registerHelper("hasVehicle", function(vehicle){
    if(vehicle == true){
      return "<span><i class='fa fa-car' aria-hidden='true' style='font-size: 20px; margin-left: 10px;'></i> Has a vehicle</span>"
    }
  })

  Handlebars.registerHelper("unionStatus", function(union_member, union_permit){
    if (union_member.length > 0 && union_permit.length > 0){
      return "Union Status: " + "member: " + union_member + " ; " + "permit:" + $.map(union_permit, function(val){ return val.union_name }).join(",") 
      + " " + $.map(union_permit, function(union){return union.permit_days }).join(",") + " days"
    }else if (union_member.length > 0 && union_permit.length == 0){
      return "Union Status: " + "member: " + union_member 
    }else if (union_member.length == 0 && union_permit.length > 0){
      return "Union Status: " + "permit: " + $.map(union_permit, function(val){ return val.union_name }).join(",") 
      + " " + $.map(union_permit, function(union){return union.permit_days }).join(",") + " days"
    }else{
      return "Non Union"
    }
  })

  Handlebars.registerHelper("isAvailableToday", function(availability){
    
    function pad2(number) {   
     return (number < 10 ? '0' : '') + number
    }   
    var d=new Date()
    var dd=d.getDate();
    var mm=pad2(d.getMonth()+1);
    var yyyy=d.getFullYear();
    var today=yyyy+"-"+mm+"-"+dd;
 
    var result = $.inArray(today, availability)
    if(result < 0){
      return "<i class='fa fa-calendar-check-o' aria-hidden='true' style='color:red; font-size: 15px;'>Unavailable </br>  Today</i>"

    }else{
      return "<i class='fa fa-calendar-check-o' aria-hidden='true'style='color:green; font-size: 15px;'>Available Today</i>"

    }
  });
  
  

 
//=====================================Send a text to Crew============================================================
  $(document).on('click', ".send_text", function (event) { 

    var modal = $(this).next()
    var current_message_text_box = modal.find(".message-text")
    var current_character_counter = modal.find(".character_counter")
    // var button = $(event.relatedTarget) // Button that triggered the modal     
    var text_length = 160 - current_message_text_box.val().trim().length;       
    current_character_counter.text(text_length + ' characters remaining');
    var text_message;
   
     $(current_message_text_box).on("keyup", function() {     
      var text_remaining = 160 -  current_message_text_box.val().trim().length;
      current_character_counter.text(text_remaining + ' characters remaining');
      text_message = current_message_text_box.val().trim();

    });

    $(".send_msg").on("click", function(event){      
      var recipient_phone = $("#recipient").text(); 
      var recipient_id = $("#recipient_id").text();    
      $.ajax({
        url: "/messages",
        method: "post",
        dataType:"json",
        data: {message:{content: text_message,recipient_id: recipient_id},recipient_phone: recipient_phone},
        success: function(resp){
          alert("Text message has been sent")
        }
      });
      event.preventDefault();
     });
  
})


//==========================================================================================================             

});

//========================================================================================================


//======================================Common function====================================================
  function ajaxPreLoadUser(opts, filter_data, role_id, current_page, hiring_board_status, url, ajax_request_data){
    $.ajax({
      url: url,
      method: "get",
      dataType: "json",
      data: ajax_request_data,
      success: function(response){   
        if (response == undefined || response.paginated_users == "") {
          UserNotFound()
        } else {
          var dataCount = response.number_users;
          var pageCount = Math.ceil(dataCount/opts.pageMax);
          var user_source = $("#user_card_template").html();    
          $.map(response.paginated_users, function(user){return filter_data.push(user)})
          console.log("response:", response.paginated_users)
          console.log("first load filter data array:", filter_data)
          
          if (dataCount > opts.pageMax){
            // Remove original pagination
            $(".pagination").remove();
         
            paginate(pageCount ,opts, filter_data, user_source);
            
            posts = response.paginated_users.slice(0, opts.pageMax);
          
          } else {
            posts = response.paginated_users;
            $(".pagination").hide();
          }  

          //load posts for the current page 
          loadPosts(posts,opts,user_source);

          //When a page is loaded, prev button is set to be disabled
          $(".pagination-prev").addClass("disabled") 
        
         
          // When click on the pagination button:
          $(".pagination-page, .pagination>li.pagination-next, .pagination>li.pagination-prev").on("click", function(){
            // when a page is clicked, reset prev button and next state 
            $(".pagination-prev, .pagination-next").removeClass("disabled")

            if ($(this).hasClass("pagination-next")){
              gotoPageNumber = parseInt($('.pagination>li.active').data("page"))+1
              disablePrevNextButton(gotoPageNumber, pageCount)
              console.log("after clicking next, the new go to page number is:", gotoPageNumber)
            } else if($(this).hasClass("pagination-prev")){
              gotoPageNumber = parseInt($('.pagination>li.active').data("page"))-1
              disablePrevNextButton(gotoPageNumber, pageCount)
            }else{

              gotoPageNumber = $(this).data("page");
              disablePrevNextButton(gotoPageNumber, pageCount)
              console.log("filter users: clicked page that goes to:", gotoPageNumber)
            }
            

            if (gotoPageNumber % 3 == 2){
              // Check if this page is clicked before, if yes, show already render info 
              if ($(".pagination-page[data-page="+ gotoPageNumber +"]").data("load")== true){
                changePage(gotoPageNumber, filter_data, opts, user_source)
              } else{
                // send another ajax request to load more data if this page is never clicked before, and show its loaded data 
                changePage(gotoPageNumber, filter_data, opts, user_source)
                debugger
                // Need to preload filter user data                 
                var need_to_load_times = Math.ceil(dataCount / 30)

                if ((gotoPageNumber + 1)/3 < need_to_load_times){
                  ajax_request_data["current_page_number"] = $(".pagination-page.active").data("page")    
                  preloadUserData(gotoPageNumber,filter_data, opts, user_source, url, ajax_request_data)
                }
              }
            }else{
              changePage(gotoPageNumber, filter_data, opts, user_source)
            }
          });
        }
      }
    });
  }

  function preloadUserData(gotoPageNumber,user_data, opts, user_source, url, ajax_data){
    $.ajax({
      url: url,
      method: "get",
      dataType: "json",
      data:ajax_data,
      success: function(response){
        if (response.paginated_users == undefined) {
          $.map(response, function(user){return user_data.push(user)})

        }else{
          $.map(response.paginated_users, function(user){return user_data.push(user)})
        }
        // user_data.push(response)
        console.log("pre load new data array:", user_data)
        // In order to ensure data is only loaded once, set data attribute load to be true        
        $(".pagination-page[data-page="+ gotoPageNumber +"]").data("load", true)
      }
    })
  
  }  



//====================================================================================================
  function markFilterparams(params){
    if (params == "has_a_vehicle"){
      $("#union_member, #union_permit").data("clickable", "")
      $("#has_a_vehicle").data("clickable","clicked")     
    }

    if (params == "union_member"){
      $("#has_a_vehicle, #union_permit").data("clickable", "")
      $("#union_member").data("clickable","clicked")     
    }

    if(params == "union_permit"){
      $("#has_a_vehicle, #union_member").data("clickable", "")
      $("#union_permit").data("clickable", "clicked")
    }
  }


 // If this is the last page or the first page, disable next and prev button
  function disablePrevNextButton(page_number, pageCount){
    if(page_number == pageCount){
      $(".pagination-next").addClass("disabled")
    }else if(page_number == 0 || page_number == 1){
      $(".pagination-prev").addClass("disabled")
    }
  }

  function range(i){return i?range(i-1).concat(i):[]}  

  function paginate(pageCount, opts, data, user_source){
    var source = $("#pagination-template").html();
    var template = Handlebars.compile(source);
    var context = {pages: range(pageCount)};
    var html = template(context);
    //add the page bar on the bottom of the page
    $("#user-pagination").append(html);

    $('.pagination>li.pagination-page').on("click", function(){
      changePage($(this).data("page"), data, opts, user_source)
    }).filter('[data-page="1"]').addClass('active');
    
  }

//====================================================================================================
  function changePage(pageNumber, data, opts, user_source){
    $('.pagination>li.pagination-page').removeClass('active');
    $('.pagination>li.pagination-page').filter('[data-page="' + pageNumber + '"]').addClass('active');
    // data format = [object, object, object .. object]
    loadPosts(data.slice(pageNumber * opts.pageMax - opts.pageMax, pageNumber * opts.pageMax)
              ,opts, user_source);
    
  }

//====================================================================================================  
  function loadPosts(posts, opts,user_source){
    opts.postsDiv.empty(); // Clear the previous posts 
    $.each(posts, function(){

        var user_card_template = Handlebars.compile(user_source);
   
        var context = {
            id: this.user_info.id,
            name: this.user_info.name, 
            vehicle : this.user_info.has_vehicle,
            image: this.user_info.image.url,
            phone: this.user_info.phone,         
            union_member: this.union_member,
            union_permit: this.union_permit,                
            availability: this.availabilities,
            path: "users/" + this.user_info.id,
        };
 
        var html = user_card_template(context);
        opts.postsDiv.append(html);
       
    });
  }





//====================================================================================================

  function UserNotFound(){
    $(".user-card, .pagination").hide();
    $("#label_not_found").text("Users not found.").show().delay(3000).fadeOut(1000);
  }


       
 