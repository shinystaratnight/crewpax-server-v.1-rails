$(function(){
//=============When the page is loaded, Using Ajax to pre load 3 users========================================================================  
  // When the Page is load, preload first 30 users
  var data = [];  
  var current_page_number = $(location).attr("search").match(/\d+/)
  current_page_number == null ? current_page_number = 0 : current_page_number = current_page_number[0]
  console.log("current_page_number:", current_page_number)
  
  var opts = {
    pageMax: 1,
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
     
     //User ajax to get the user_id 
      // firstLoadFilterRoleData(opts, filter_data, role_id, current_page, hiring_board_status)
      // data:{label:{role_id: role_id, hiring_board: hiring_board_status}, current_page: current_page},

      ajaxPreLoadUser(opts, filter_data, role_id, current_page, hiring_board_status, url, ajax_request_data)

    }
    
  });



//==========================When sorting crew by if having a vehicle ========================================================
  $("#has_a_vehicle > a").on("click", function(event){
    event.preventDefault();
    var current_page_number = $(".pagination-page").data("page")
    // mark link as clicked for furthuer sorting by availability or most recent log in 
    markFilterparams("has_a_vehicle"); 
    console.log("has a vehicle filter has been clicked:", $(this).parent().data("clickable"))
    // var roles_ids = [];
    // roles_ids.push($(this).data("selected-role-id"))
    var role_id = $("#user_role option:selected").val()
    var filter_user_data = [];
    var hiring_board_status = ""   
    var url = "/users/search"
    
    if(role_id == ""){
      var user_data = {has_vehicle: true, current_page_number: current_page_number}
    } else{
      var user_data = {role_id:role_id, has_vehicle:true, current_page_number: current_page_number};
    }
    // debugger
    filterUser(user_data, opts, filter_user_data);
    // ajaxPreLoadUser(opts, filter_user_data, role_id, current_page_number, hiring_board_status, url, user_data)

  });  

//==========================When sorting crew by if the user is a union member ========================================================
  $("#union_member > a").on("click", function(event){
    markFilterparams("union_member")
    event.preventDefault();
    console.log("union member filter has been clicked:", $(this).parent().data("clickable"))
    var role_id = $("#user_role option:selected").val()
    var filter_user_data = [];
    if(role_id == ""){
      var user_data = {union_member: true, current_page_number: current_page_number}     
    } else{
      var user_data = {role_id:role_id, union_member:true, current_page_number: current_page_number};
    }
    
    filterUser(user_data, opts, filter_user_data);

  }); 

//==========================When sorting crew by if the user is a union permitee ========================================================
  $("#union_permit > a").on("click", function(event){
    markFilterparams("union_permit")
    event.preventDefault();
    console.log("union permit filter has been clicked:", $(this).parent().data("clickable"))
    var role_id = $("#user_role option:selected").val()
    var filter_user_data = [];
    if(role_id == ""){
      var user_data = {union_permit: true, current_page_number: current_page_number}
      // filterUser(user_data, opts, filter_user_data);
    } else{
      var user_data = {role_id:role_id, union_permit:true, current_page_number: current_page_number};
     
    }

    filterUser(user_data, opts, filter_user_data);

  });  
  
//=========================================================================================================
  $("#available_soon > a, #most_recent_log_in > a").on("click", function(event){
    event.preventDefault();
    var current_page_number = $(".pagination-page").data("page")
    var role_id = $("#user_role option:selected").val()
    var user_available_data =[];
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
      sortUser(user_data, opts, user_available_data)        
    }else{
  
      if($(this).data("availability") == "most_recent"){
        var user_data = {current_page_number: current_page_number, availability: "most_recent", role_id: role_id, filter_element:filter_element}
      }else if($(this).data("last-log-in") == "most_recent"){
        var user_data = {current_page_number: current_page_number, last_log_in: "most_recent", role_id: role_id, filter_element:filter_element}
      }
      sortUser(user_data, opts, user_available_data)

     
    }

  })




//===================================================================================================




//=========================================================================================================
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
          debugger
          if (dataCount > opts.pageMax){
            // Remove original pagination
            $(".pagination").remove();
            paginate(pageCount,opts, filter_data, filter_user_source);
            posts = response.paginated_users.slice(0, opts.pageMax);
          
          } else {
            posts = response.paginated_users;
            $(".pagination").hide();
          }  

          var filter_user_source = $("#user_card_template").html()
          //load posts for the current page 
          loadPosts(posts,opts,filter_user_source); 

          // When click on the pagination button:
          $(".pagination-page").on("click", function(){
            var gotoPageNumber = $(this).data("page");
            console.log("filter users: clicked page that goes to:", gotoPageNumber)
            if (gotoPageNumber % 3 == 2){
              // Check if this page is clicked before, if yes, show already render info 
              if ($(this).data("load")== true){
                changePage(gotoPageNumber, filter_data, opts, filter_user_source)
              } else{
                // send another ajax request to load more data if this page is never clicked before, and show its loaded data 
                changePage(gotoPageNumber, filter_data, opts, filter_user_source)
                // Need to preload filter user data 
                
                var need_to_load_times = Math.ceil(dataCount / 3)
                debugger
                
                if ((gotoPageNumber + 1)/3 < need_to_load_times){

                  ajax_request_data["current_page_number"] = $(".pagination-page.active").data("page")
                  debugger    
                  preloadUserData(gotoPageNumber,filter_data, opts, user_source, url, ajax_request_data)
                }
                // Index page preload data again 
                // Role page need to preload filter data 
                
              }
            }else{
              changePage(gotoPageNumber, filter_data, opts, filter_user_source)
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
  function filterUser(user_data, opts, filter_user_data){
    $.ajax({
      url:"/users/search",
      method: "get",
      dataType: "json",
      data: user_data,
      success: function(response){ 
        console.log("users with vehicle response:", response.paginated_users)
        if (response == undefined || response.paginated_users == "") {
          UserNotFound()
        }else{
          var dataCount = response.number_users;
          var pageCount = Math.ceil(dataCount/opts.pageMax);
          debugger
          $.map(response.paginated_users, function(user){return filter_user_data.push(user)})
          var user_source = $("#user_card_template").html();
          if (dataCount > opts.pageMax){
            // Remove original pagination
            $(".pagination").remove();
            paginate(pageCount,opts, filter_user_data, user_source);
            posts = response.paginated_users.slice(0, opts.pageMax);
          
          } else {
            posts = response.paginated_users;
            $(".pagination").hide();
          } 

          //load posts for the current page 
          loadPosts(posts,opts,user_source); 

          // When click on the pagination button:
          $(".pagination-page").on("click",{params: response.sorting_params, role: response.role_id},function(event){
            var gotoPageNumber = $(this).data("page");
            console.log("filter users: clicked page that goes to:", gotoPageNumber)
            if (gotoPageNumber % 3 == 2){
              // Check if this page is clicked before, if yes, show already render info 
              if ($(this).data("load")== true){
                changePage(gotoPageNumber, filter_user_data, opts, user_source)
              } else{
                // send another ajax request to load more data if this page is never clicked before, and show its loaded data 
                changePage(gotoPageNumber, filter_user_data, opts, user_source)
                // Need to preload filter user data 
                // preloadFilterUserData(role_id,gotoPageNumber,filter_user_data, opts, user_source)
                var url = "/users/search"
                //dataCount < 30 search result is less than 30 users, only load once
                // dataCount > 30 search result is more than 30 users, need to load multiple times
                // need_to_load_times = Math.cell(dataCount/30)
                var need_to_load_times = Math.ceil(dataCount / 3)
               
                var role_id = event.data.role 
                preloadFilterDataAjaxParams(event.data.params, gotoPageNumber, role_id)

                debugger
                if ((gotoPageNumber + 1)/3 < need_to_load_times){

                  preloadUserData(gotoPageNumber,filter_user_data, opts, user_source, url, ajax_data_filter)
                }
              }
            }else{
              changePage(gotoPageNumber, filter_user_data, opts,user_source)
            }

          });
        }

      }
    });
  }


  function sortUser(ajax_data,opts,sorting_data){
    $.ajax({
      url: "/users/sort",
      method: "get",
      dataType: "json",
      data: ajax_data,
      success:function(response){
        console.log("users with most recent availability response:", response.paginated_users)
        if (response == undefined || response.paginated_users == "") {
          UserNotFound()
        }else{
          var dataCount = response.number_users;
          var pageCount = Math.ceil(dataCount/opts.pageMax);
          var user_source = $("#user_card_template").html();
          $.map(response.paginated_users, function(user){return sorting_data.push(user)})
          var sorting_params = response.sorting_params
          if (dataCount > opts.pageMax){
            // Remove original pagination
            $(".pagination").remove();
            paginate(pageCount,opts, sorting_data, user_source);
            posts = response.paginated_users.slice(0, opts.pageMax);
          
          } else {
            posts = response.paginated_users;
            $(".pagination").hide();
          } 

          //load posts for the current page 
          loadPosts(posts,opts,user_source); 

          // When click on the pagination button:
          $(".pagination-page").on("click", { sorting_params: response.sorting_params, 
                                              filter_element: response.filter_element,
                                              role: response.role_id}, function(event){
            var gotoPageNumber = $(this).data("page");
            console.log("sort users : clicked page that goes to:", gotoPageNumber)
            if (gotoPageNumber % 3 == 2){
              // Check if this page is clicked before, if yes, show already render info 
              if ($(this).data("load")== true){
                changePage(gotoPageNumber, sorting_data, opts, user_source)
              } else{
                // send another ajax request to load more data if this page is never clicked before, and show its loaded data 
                changePage(gotoPageNumber, sorting_data, opts, user_source)
                // Need to preload filter user data 
                // preloadFilterUserData(role_id,gotoPageNumber,sorting_data, opts, user_source)
                var url = "/users/sort"
                //dataCount < 30 search result is less than 30 users, only load once
                // dataCount > 30 search result is more than 30 users, need to load multiple times
                // need_to_load_times = Math.cell(dataCount/30)
                var need_to_load_times = Math.ceil(dataCount / 3)

                // if (event.data.sorting_params == "last_log_in"){
                //   var ajax_data = {current_page_number:parseInt(gotoPageNumber),last_log_in: "most_recent"}
                // } else if(event.data.sorting_params == "availability"){
                //   var ajax_data = {current_page_number:parseInt(gotoPageNumber),availability: "most_recent"}
                // }      
             
                var role_id = event.data.role
                var filter_element = event.data.filter_element
                
                preloadSortParamsAjax(event.data.sorting_params, gotoPageNumber, role_id, filter_element)
               
              
                debugger
                if ((gotoPageNumber + 1)/3 < need_to_load_times){
                  debugger
                  preloadUserData(gotoPageNumber,sorting_data, opts, user_source, url, ajax_sort_data )
                }
              }
            }else{
              changePage(gotoPageNumber, sorting_data, opts,user_source)
            }

          });

        }
      }
    })

  }
  
  function preloadSortParamsAjax(event_params, gotoPageNumber, role_id, filter_element){
    if (event_params == "last_log_in"){
       ajax_sort_data = {current_page_number: parseInt(gotoPageNumber), last_log_in: "most_recent" ,role_id: role_id, filter_element:filter_element}
      debugger

    }else if(event_params == "availability"){
      ajax_sort_data = {current_page_number: parseInt(gotoPageNumber), availability: "most_recent",role_id: role_id, filter_element:filter_element}
    }

  }


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

  function preloadFilterDataAjaxParams(event_params, gotoPageNumber, role_id){
    if (event_params == "has_vehicle"){
      return ajax_data_filter = {current_page_number: parseInt(gotoPageNumber), role_id:role_id, has_vehicle:true }
    }else if (event_params == "union_member"){
      return ajax_data_filter = {current_page_number: parseInt(gotoPageNumber), role_id:role_id, union_member: true }

    }else if(event_params == "union_permit"){
      return ajax_data_filter = {current_page_number: parseInt(gotoPageNumber), role_id:role_id, union_permit: true }
    }
  }



  function range(i){return i?range(i-1).concat(i):[]}  

  function paginate(pageCount, opts, data, user_source){
    var source = $("#pagination-template").html();
    var template = Handlebars.compile(source);
    var context = {pages: range(pageCount)};
    var html = template(context);
    opts.postsDiv.after(html);//add the page bar both on the top and bottom of the page

    // var pageItems = $('.pagination>li.pagination-page');

    // pageItems.on('click', function(){
    //   debugger
    //     changePage(this.getAttribute('data-page'));
    // }).filter('[data-page="1"]').addClass('active');
    // $('.pagination>li.pagination-page').on("click", function(){
    //   changePage($(this).data("page"), data, opts, user_source)
    //   debugger
    // })
    // .filter('[data-page="1"]').addClass('active');

    // $('.pagination>li.pagination-prev').on('click', function(){
       
    //     gotoPageNumber = parseInt($('.pagination>li.active').data('page')) - 1;
      
    //     // if (gotoPageNumber <= 0){gotoPageNumber = pageCount;}
    //     // changePage(gotoPageNumber, data, opts);
    //   });

    // $('.pagination>li.pagination-next').on('click', function(){
    //   debugger
    //     gotoPageNumber = parseInt($('.pagination>li.active').attr('data-page')) + 1;
    //     // if (gotoPageNumber > pageCount){gotoPageNumber = 1;}
    //     // changePage(gotoPageNumber,data, opts);
    // });
    
  }

//====================================================================================================
  function changePage(pageNumber, data,opts, user_source){
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
            name: this.user_info.name, 
            vehicle : this.user_info.has_vehicle,
            image: this.user_info.image,
            phone: this.user_info.phone,
            union_member: this.user_info.image,
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


       
 