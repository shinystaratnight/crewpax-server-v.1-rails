$(function(){
//=============When the page is loaded, Using Ajax to pre load 3 users========================================================================  
  // When the Page is load, preload first 30 users
  var data = [];  
  var current_page_number = $(location).attr("search").match(/\d+/)
  current_page_number == null ? current_page_number = 0 : current_page_number = current_page_number[0]
  console.log("current_page_number:", current_page_number)

  if (current_page_number == 0){
    var opts = {
    pageMax: 1,
    postsDiv: $('#user-list'),

    }
  
    firstloadUser(opts,data);

  } 

  
  // When a user is on the 2nd, 5th, 7th +++ page, send another ajax request to preload the next 30 users info
  // $(document).on("click", ".pagination-page",function(data){
  //   debugger
  //   // var current_page_number = $(location).attr("search").match(/\d+/)
  //   // current_page_number == null ? current_page_number = 0 : current_page_number = current_page_number[0]
  //   // console.log("next page clicked, current_page_number is:", current_page_number)
  //   var gotoPageNumber = $(this).data("page");
  //   console.log("clicked page that goes to:", gotoPageNumber)

  //   if (gotoPageNumber % 3 == 2){

  //   }else{
 
      
  //   }
    
  // });
 


  // $("#user-pagination").on("click", "pagination>li.pagination-page", function(){
  //   alert("next page clicked")
  //   console.log("next page clicked ")

  //     // changePage($(this).data("page"), data, opts, user_source)
  //     // debugger
  //   });
  
  // $(".pagination-page a ").on("click", function(){
    
  // })


  // else if (current_page_number % 3 == 2){
  //   // var preload_time = (current_page_number + 1) / 3
  //   debugger
  //   preloadUser(current_page_number);
  // }
  
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
      firstLoadFilterData(opts, filter_data, role_id, current_page, hiring_board_status)
    }
    
  });



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
              preloadUserData(gotoPageNumber,data, opts, user_source);
            }
          }else{
            changePage(gotoPageNumber, data, opts, user_source)
          }

        })
      }
    });

  }

  
  function preloadUserData(gotoPageNumber,user_data, opts, user_source){
 
    $.ajax({
      url: "/users",
      method: "get",
      dataType: "json",
      data:{page: parseInt(gotoPageNumber)},
      success: function(response){
        $.map(response, function(user){return user_data.push(user)})
        // user_data.push(response)
        console.log("new data array:", user_data)
        // In order to ensure data is only loaded once, set data attribute load to be true        
        $(".pagination-page[data-page="+ gotoPageNumber +"]").data("load", true)
      }
    })
  
  }


  function firstLoadFilterData(opts, filter_data, role_id, current_page, hiring_board_status){
    $.ajax({
      url: "/roles/" + role_id + "/labels",
      method: "get",
      dataType: "json",
      data:{label:{role_id: role_id, hiring_board: hiring_board_status}, current_page: current_page},
      success: function(response){   
        debugger
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
                preloadFilterUserData(role_id,gotoPageNumber,filter_data, opts, filter_user_source)
                
              }
            }else{
              changePage(gotoPageNumber, filter_data, opts, filter_user_source)
            }
          });
        }
      }
    });
  }


  function preloadFilterUserData(role_id,gotoPageNumber,user_data, opts, user_source){
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

//====================================================================================================
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
       
 