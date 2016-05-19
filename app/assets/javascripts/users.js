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
    var opts = {
    pageMax: 1,
    postsDiv: $('#user-list'),

    }
  
    firstloadUser(opts,data);
  
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
      var opts = { 
        pageMax: 1,
        postsDiv: $('#user-list')
      }
      var filter_data = [];

     //User ajax to get the user_id 
      firstLoadFilterRoleData(opts, filter_data, role_id, current_page, hiring_board_status)
    
      // $("#has_a_vehicle > a").on("click", function(event){
      //    event.preventDefault();
      //    var role_id = $("#user_role option:selected").val()
      //    debugger
      // });


    }
    
  });



//==========================When sorting crew by if having a vehicle ========================================================
  $("#has_a_vehicle > a").on("click", function(event){
    event.preventDefault();
    var current_page_number = $(".pagination-page").data("page")
    // mark link as clicked for furthuer sorting by availability or most recent log in 
    $(this).parent().data("clickable", "clicked") 
    console.log("filter has been clicked:", $(this).parent().data("clickable"))
    // var roles_ids = [];
    // roles_ids.push($(this).data("selected-role-id"))
    var role_id = $("#user_role option:selected").val()
    var vehicle_user_data = [];
       
    if(role_id == ""){
      var user_data = {has_vehicle: true, current_page_number: current_page_number}
      filterUser(user_data, opts, vehicle_user_data);
    } else{
      var user_data = {role_id:role_id, has_vehicle:true, current_page_number: current_page_number};
      filterUser(user_data, opts, vehicle_user_data);
    }
    
  });  

//==========================When sorting crew by if the user is a union member ========================================================
  $("#union_member > a").on("click", function(event){
    $(this).parent().data("clickable", "clicked") 
    alert("union member clicked")
    event.preventDefault();
    console.log("filter has been clicked:", $(this).parent().data("clickable"))

  }); 

//==========================When sorting crew by if the user is a union permitee ========================================================
  $("#union_permit > a").on("click", function(event){
    $(this).parent().data("clickable", "clicked") 
    alert("union permit clicked")
    event.preventDefault();
    console.log("filter has been clicked:", $(this).parent().data("clickable"))

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

      // if(filter_element == ""){
      // // Nothing is being filtered      
        if($(this).data("availability") == "most_recent"){
          var user_data = {current_page_number: current_page_number, availability: "most_recent",filter_element:filter_element}
        }else if($(this).data("last-log-in") == "most_recent"){
          var user_data = {current_page_number: current_page_number, last_log_in: "most_recent",filter_element:filter_element}
        }
        sortUser(user_data, opts, user_available_data)
        
      // }else{
      //   // User has chosen whether users needs to have a vehicle/union member/union permit
      //   if($(this).data("availability") == "most_recent"){
      //     var user_data = {current_page_number: current_page_number, availability: "most_recent", filter_element:filter_element}
      //   }else if($(this).data("last-log-in") == "most_recent"){
      //     var user_data = {current_page_number: current_page_number, last_log_in: "most_recent", filter_element: filter_element}
      //   }
      //   sortUser(user_data, opts, user_available_data)
      // }
    }else{

      if(filter_element == ""){
        if($(this).data("availability") == "most_recent"){
          var user_data = {current_page_number: current_page_number, availability: "most_recent", role_id: role_id}
        }else if($(this).data("last-log-in") == "most_recent"){
          var user_data = {current_page_number: current_page_number, last_log_in: "most_recent", role_id: role_id}
        }
        sortUser(user_data, opts, user_available_data)

      }else{

      }
    }

  })




//===================================================================================================




//=========================================================================================================
});

//========================================================================================================


//======================================Common function====================================================
 
  function firstloadUser(opts,data){
    $.ajax({
      url: "/users",
      method: "get",
      dataType: "json",
      success: function(response){
        var dataCount = response.total_user;
        var pageCount = Math.ceil(dataCount/opts.pageMax);
        $.map(response.paginated_users, function(user){return data.push(user)})
        // data.push(response.paginated_users) // Add return response json in an array will return => [object]
        console.log("response:", response.paginated_users)
        console.log("first load data array:", data)
        var user_source = $("#user_card_template").html();      
        if (dataCount > opts.pageMax){
          paginate(pageCount,opts,data, user_source);
          posts = response.paginated_users.slice(0, opts.pageMax);
        
        } else {
          posts = response.paginated_users;
        }        

        //load posts for the current page
        loadPosts(posts,opts,user_source); 

        // When click on the pagination button:
        $(".pagination-page").on("click", function(){
          var gotoPageNumber = $(this).data("page");
          console.log("clicked page that goes to:", gotoPageNumber)
          if (gotoPageNumber % 3 == 2){
            // Check if this page is clicked before, if yes, show already render info 
            if ($(this).data("load")== true){
              changePage(gotoPageNumber, data, opts, user_source)
            } else{
            // send another ajax request to load more data if this page is never clicked before, and show its loaded data 
              changePage(gotoPageNumber, data, opts, user_source)
              var url = "/users"
              preloadUserData(gotoPageNumber,data, opts, user_source, url, {page: parseInt(gotoPageNumber)});
            }
          }else{
            changePage(gotoPageNumber, data, opts, user_source)
          }

        });


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
        console.log("new data array:", user_data)
        // In order to ensure data is only loaded once, set data attribute load to be true        
        $(".pagination-page[data-page="+ gotoPageNumber +"]").data("load", true)
      }
    })
  
  }


  function firstLoadFilterRoleData(opts, filter_data, role_id, current_page, hiring_board_status){
    $.ajax({
      url: "/roles/" + role_id + "/labels",
      method: "get",
      dataType: "json",
      data:{label:{role_id: role_id, hiring_board: hiring_board_status}, current_page: current_page},
      success: function(response){   
        if (response == undefined || response.paginated_users == "") {
          UserNotFound()
        } else {
          var dataCount = response.total_user;
          var pageCount = Math.ceil(dataCount/opts.pageMax);
          $.map(response.paginated_users, function(user){return filter_data.push(user)})
          console.log("response:", response.paginated_users)
          console.log("first load filter data array:", filter_data)
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
                preloadFilterUserRoleData(role_id,gotoPageNumber,filter_data, opts, filter_user_source)
                
              }
            }else{
              changePage(gotoPageNumber, filter_data, opts, filter_user_source)
            }
          });
        }
      }
    });
  }


  function preloadFilterUserRoleData(role_id,gotoPageNumber,user_data, opts, user_source){
    $.ajax({
      url: "/roles/" + role_id + "/labels",
      method: "get",
      dataType: "json",
      data:{label:{role_id: role_id, hiring_board: "clicked"}, current_page: parseInt(gotoPageNumber)},
      success: function(response){
        if(response.paginated_users == ""){
          return false;
        }else{
          $.map(response.paginated_users, function(user){return user_data.push(user)})
          // In order to ensure data is only loaded once, set data attribute load to be true        
          $(".pagination-page.active").data("load", true)
          console.log("pagination button load:", $(".pagination-page.active").data("load"))
        }
      }
    });
  }


//====================================================================================================
  function filterUser(user_data, opts, vehicle_user_data){
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
          var dataCount = response.number_users_have_vehicle;
          var pageCount = Math.ceil(dataCount/opts.pageMax);
          $.map(response.paginated_users, function(user){return vehicle_user_data.push(user)})
          var user_source = $("#user_card_template").html();
          if (dataCount > opts.pageMax){
            // Remove original pagination
            $(".pagination").remove();
            paginate(pageCount,opts, vehicle_user_data, user_source);
            posts = response.paginated_users.slice(0, opts.pageMax);
          
          } else {
            posts = response.paginated_users;
            $(".pagination").hide();
          } 

          //load posts for the current page 
          loadPosts(posts,opts,user_source); 

          // When click on the pagination button:
          $(".pagination-page").on("click", function(){
            var gotoPageNumber = $(this).data("page");
            console.log("filter users: clicked page that goes to:", gotoPageNumber)
            if (gotoPageNumber % 3 == 2){
              // Check if this page is clicked before, if yes, show already render info 
              if ($(this).data("load")== true){
                changePage(gotoPageNumber, vehicle_user_data, opts, user_source)
              } else{
                // send another ajax request to load more data if this page is never clicked before, and show its loaded data 
                changePage(gotoPageNumber, vehicle_user_data, opts, user_source)
                // Need to preload filter user data 
                // preloadFilterUserData(role_id,gotoPageNumber,vehicle_user_data, opts, user_source)
                var url = "/users/search"
                //dataCount < 30 search result is less than 30 users, only load once
                // dataCount > 30 search result is more than 30 users, need to load multiple times
                // need_to_load_times = Math.cell(dataCount/30)
                var need_to_load_times = Math.ceil(dataCount / 4)
                if ((gotoPageNumber + 1)/3 < need_to_load_times){
                  preloadUserData(gotoPageNumber,vehicle_user_data, opts, user_source, url, {current_page_number:parseInt(gotoPageNumber),has_vehicle: true })
                }
              }
            }else{
              changePage(gotoPageNumber, vehicle_user_data, opts,user_source)
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
          $(".pagination-page").on("click", {sorting_params: sorting_params}, function(event){
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
                var need_to_load_times = Math.ceil(dataCount / 4)
                if (event.data.sorting_params == "last_log_in"){
                  var ajax_data = {current_page_number:parseInt(gotoPageNumber),last_log_in: "most_recent"}
                } else if(event.data.sorting_params == "availability"){
                  var ajax_data = {current_page_number:parseInt(gotoPageNumber),availability: "most_recent"}
                }                
                if ((gotoPageNumber + 1)/3 < need_to_load_times){
                  preloadUserData(gotoPageNumber,sorting_data, opts, user_source, url, ajax_data )
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




  // function sortUser(data){
  //   console.log("data array in sort user:", data)
  //   debugger
  //   data.sort(vehicleSort(data))
  
  // }

  // function vehicleSort(property) {
    
  //   var sortOrder = 1;
  //   if(property[0].user_info.has_vehicle === true) {
  //       sortOrder = -1;
  //       property = property.substr(1);
  //   }
  //   debugger
  //   return function (a,b) {
  //       var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  //       return result * sortOrder;
  //   }
  // }


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



        //Using a pagination plugin
        // var total_user = 35
        // var per_page = 5

        // $("#user-pagination").twbsPagination({
        //   totalPages: Math.ceil(total_user / per_page),
        //   visiblePages: 3,
        //   href: '?page={{number}}'
        //   // onPageClick: function (event, page, html) {
        //   //   $('#user-list').text('Page ' + page);
            
        
            
        // // }
        // });
       
 