$(function(){
//=============When the users page is loaded, Using Ajax to pre load 3 users========================================================================
  // When the Page is load, preload first 30 users

  if (window.location.pathname == "/users"){
    var data = [];
    var current_page_number = $(location).attr("search").match(/\d+/)
    current_page_number == null ? current_page_number = 0 : current_page_number = current_page_number[0]

    var opts = {
      pageMaxLo: 9,
      pageMaxHi: 18,
      pageMax: 12,  // default
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

  }

//=============================Search Employees with given roles inside $(function)=========================================
  $("#user_role").on("change",function(){
    var role_id = $(this).val();

  // when the selection is all
    if (role_id == 0 && $(this).data("selected-user-role") == ""){
      // if ($(this).data("selected-user-role") == "") {
      $(".user-card").show();
      // } else {

      // }
      return false;
    }else{
      $(this).data("selected-user-role", "clicked")
      var hiring_board_status = $(this).data("selected-user-role");
      var current_page = $(".pagination-page").data("page")
      var filter_data = [];
      var url = "/roles/" + role_id + "/labels"
      var ajax_request_data = {label:{role_id: role_id, hiring_board: hiring_board_status}, current_page_number: current_page}

      // ???
      if (role_id == 0) {
        url = "/users";
        ajax_request_data = {current_page_number: 0};
        role_id = "";
        hiring_board_status = "";
      }

      ajaxPreLoadUser(opts, filter_data, role_id, current_page, hiring_board_status, url, ajax_request_data)

    }

  });

//==========================Filter Crews by (Vehicle/Union Member/Union Permit) ========================================================
  $("#has_a_vehicle > a, #union_member > a, #union_permit > a").on("click", function(event){
    event.preventDefault();
    //===testing===
    console.log("pagination?: " +$(".pagination-page").data("page"));
    //var current_page_number = $(".pagination-page").data("page")
    var current_page_number = 0;
    //=============
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
    //====== same same as before - temp to 0 ===================
    //var current_page_number = $(".pagination-page").data("page")
    var current_page_number = 0;
    //==========================================================
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
      return "<span id='user_has_vehicle'><i class='fa fa-car' aria-hidden='true' style='font-size: 20px; margin-left: 10px;'></i> Has a vehicle</span>"
    }
  })

  Handlebars.registerHelper("unionStatus", function(union_member, union_permit){
    if (union_member.length > 0 && union_permit.length > 0){
      return "Union:" + "member: " + union_member + "; " + '</br>' + " permit:" + $.map(union_permit, function(val){ return val.union_name }).join(",")
      + " " + $.map(union_permit, function(union){return union.permit_days }).join(",") + " days"
    }else if (union_member.length > 0 && union_permit.length == 0){
      return "Union:" + "member: " + union_member
    }else if (union_member.length == 0 && union_permit.length > 0){
      return "Union:" + "permit: " + $.map(union_permit, function(val){ return val.union_name }).join(",")
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
    var dd=pad2(d.getDate());
    var mm=pad2(d.getMonth()+1);
    var yyyy=d.getFullYear();
    var today=yyyy+"-"+mm+"-"+dd;

    var result = $.inArray(today, availability)

    if(result < 0){
      return "<button class='btn btn-danger' style='font-size: 12px;'>Unavailable </br>Today</button>";
    }else{
      return "<button class='btn btn-success' style='font-size: 12px;'>Available </br>Today</button>";

    }
  });

  Handlebars.registerHelper("classNameByAvailability", function(availability, day, start_date){
    function pad2(number) {
     return (number < 10 ? '0' : '') + number;
    }
    var d=new Date();
    var dd=pad2(d.getDate());
    var mm=pad2(d.getMonth()+1);
    var yyyy=d.getFullYear();
    var today=yyyy+mm+dd;

    day = day.toString();
    dashedDay = day.substring(0,4)+"-"+day.substring(4,6)+"-"+day.substring(6,8)
    var wday = ((new Date(dashedDay).getDay() + 1) % 7).toString();
    var td_class = "day ";
    td_class += "wday-" + wday;

    if (day == today){
      td_class += " today ";
    } else if (day < today) {
      td_class += " past ";
    } else {
      td_class += " future ";
    }

    if (day == start_date.toString()) {
      td_class += "start-date ";
    }
    if (day.substring(4,6) != start_date.toString().substring(4,6)) {
      if (day < start_date) {
        td_class += "prev-month ";
      } else {
        td_class += "next-month ";
      }
    } else {
      td_class += "current-month ";
    }

    if (availability.indexOf(dashedDay) != -1) {
      td_class += "available";
    } else {
      td_class += "unavailable";
    }

    return td_class;
  });


  Handlebars.registerHelper("idReturn", function(id){
    newId = Number(id);
    console.log(newId);
    return newId;
  });


//=====================================Send a text to Crew============================================================
  $(document).on('click', ".send_text", function (event) {

    var modal = $(this).parent().next();

    var current_message_text_box = modal.find(".message-text")

    var current_character_counter = modal.find(".character_counter")
    var text_length = 160 - current_message_text_box.val().trim().length;
    current_character_counter.text(text_length + ' characters remaining');
    var text_message;

     $(current_message_text_box).on("keyup", function() {

      var text_remaining = 160 -  current_message_text_box.val().trim().length;
      current_character_counter.text(text_remaining + ' characters remaining');
      text_message = current_message_text_box.val().trim();

    });


    $(".send_msg").on("click", function(event){
      event.preventDefault();
      var recipient_phone = modal.find("#recipient").text();
      var recipient_id = modal.find("#recipient_id").text();

      if(text_message == undefined){
        modal.find(".message_status")
             .text("Text message can not be blank.")
             .removeClass("alert-info")
             .addClass("alert-danger")
             .show()
             .delay(3000)
             .fadeOut(1000);
        return false;
      }

      $.ajax({
        url: "/messages",
        method: "post",
        dataType:"json",
        data: {message:{content: text_message,recipient_id: recipient_id},recipient_phone: recipient_phone},
        success: function(resp){
          if (resp == "queued"){
            modal.find(".message_status").text("Text message has been sent successfully.").removeClass("alert-danger").addClass("alert-success").show()
          }else{
            modal.find(".message_status").text("Failed to send text message.").show()

          }

        }

      });

     });

  });


//=====================================Change Availiability status============================================================
  $('.profile-day.future.current-user-true').on('click', function (event) {
    function convertDateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
    var date = new Date($(this).find('.today-date').text());
    date = convertDateToUTC(date);
    var day = date.getDay();
    var week = (date.getDate() - day).toString() + " - " + (date.getDate() - day + 6).toString();
    if ($(this).hasClass('unavailable')) {
      ajaxAddAvailabilityProfile(day,date,week,$(this));
    } else {
      var availability_id = $(this).data("availability-id");
      ajaxDeleteAvailabilityProfile(day,date,week,availability_id, $(this));
    }
  });
//==========================================================================================================

//==========================Two week calendar scrolling====================================================//

  // helper to pre-emptively add browsing class to calendar about to be re-rendered
  $(document).on('click', '.small-cal-browse', function (event) {
    $(this).parent().parent().addClass('browsing');
  });

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
          // new control flow to keep page count under 16 unless there are more than 270 users.
          // pages can have maxes of at least 12 and up to 18.
          console.log(dataCount);
          opts.pageMax = Math.min(Math.max(opts.pageMaxLo, 3 * Math.ceil(dataCount/45)), opts.pageMaxHi);
          pageCount = Math.ceil(dataCount/opts.pageMax);
          // var pageCount = Math.ceil(dataCount/opts.pageMax);  <- old version

          var user_source = $("#user_card_template").html();
          $.map(response.paginated_users, function(user){return filter_data.push(user)})

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

          // When a page is loaded, prev button is set to be disabled
          $(".pagination-prev").addClass("disabled")
          $(".pagination-10-back").addClass("disabled")

          // When click on the pagination button:
          $(".pagination-page, .pagination>li.pagination-next, .pagination>li.pagination-prev, .pagination>li.pagination-10-back, .pagination>li.pagination-10-ahead").on("click", function(){

            // only works if not disabled
            if (!$(this).hasClass("disabled")) {

              // when a page is clicked, reset prev button and next state
              $(".pagination-prev, .pagination-next").removeClass("disabled");
              // same with 10-back and 10-ahead
              $(".pagination-10-back, .pagination-10-ahead").removeClass("disabled");

              if ($(this).hasClass("pagination-next")){
                gotoPageNumber = parseInt($('.pagination>li.active').data("page"))+1
                disablePrevNextButton(gotoPageNumber, pageCount)
              } else if ($(this).hasClass("pagination-prev")){
                gotoPageNumber = parseInt($('.pagination>li.active').data("page"))-1
                disablePrevNextButton(gotoPageNumber, pageCount)
              } else if ($(this).hasClass("pagination-10-back")){
                gotoPageNumber = parseInt($('.pagination>li.active').data("page"))-10
                disablePrevNextButton(gotoPageNumber, pageCount)
              } else if ($(this).hasClass("pagination-10-ahead")){
                gotoPageNumber = parseInt($('.pagination>li.active').data("page"))+10
                disablePrevNextButton(gotoPageNumber, pageCount)
              } else {
                gotoPageNumber = $(this).data("page");
                disablePrevNextButton(gotoPageNumber, pageCount)
              }

              var ellipsisClicked = false;
              if (!($(".pagination-page[data-page="+ gotoPageNumber +"]").length) ||
                  $(".pagination-page[data-page="+ gotoPageNumber +"]").hasClass('ellipsis')) {
                ellipsisClicked = true;
              }

              if (gotoPageNumber % 3 == 2){
                // Check if this page is clicked before, if yes, show already render info
                if ($(".pagination-page[data-page="+ gotoPageNumber +"]").data("load")== true){
                  changePage(pageCount, gotoPageNumber, filter_data, opts, user_source, ellipsisClicked)
                } else{
                  // send another ajax request to load more data if this page is never clicked before, and show its loaded data
                  changePage(pageCount, gotoPageNumber, filter_data, opts, user_source, ellipsisClicked)

                  // Need to preload filter user data
                  var need_to_load_times = Math.ceil(dataCount / 30)

                  if ((gotoPageNumber + 1)/3 < need_to_load_times){
                    ajax_request_data["current_page_number"] = $(".pagination-page.active").data("page")
                    preloadUserData(gotoPageNumber,filter_data, opts, user_source, url, ajax_request_data)
                  }
                }
              }else{
                changePage(pageCount, gotoPageNumber, filter_data, opts, user_source, ellipsisClicked)
              }
            } else {
              // prevent refresh when clicking disabled
              event.preventDefault();
            }
          }).filter('[data-page="' + current_page + '"]').addClass('active');
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

        // In order to ensure data is only loaded once, set data attribute load to be true
        $(".pagination-page[data-page="+ gotoPageNumber +"]").data("load", true)
      }
    })

  }

//==============================Profile Page Availability Change Functions==========================================


  function ajaxAddAvailabilityProfile(day,date,week,checkbox){
    var user_id = checkbox.data("user-id");
    $.ajax({
      url:"/users/" + user_id + "/appointments",
      method: "post",
      dataType:"json",
      data:{appointment:{day: day, user_id: user_id, date: date, week:week}},
      success: function(response){
        checkbox.removeClass("unavailable").addClass("available").find('.dot').css("background-color", "#22aa22");
        checkbox.attr( 'data-availability-id', response.id );
        checkbox.data("availability-id", response.id);
      }
    });
  }

  function ajaxDeleteAvailabilityProfile(day,date,week,availability_id,checkbox){
    $.ajax({
      url: "/appointments/" + availability_id,
      method: "delete",
      dataType: "json",
      data:{appointment:{day: day, id: availability_id, date:date, week:week}},
      success: function(response){
        checkbox.data("availability-id", "");
        checkbox.attr( 'data-availability-id', "" );
        checkbox.removeClass("available").addClass("unavailable").find('.dot').css("background-color", "#aa2222");
      }
    });
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
    if(page_number > pageCount - 10){
      $(".pagination-10-ahead").addClass("disabled")
    }
    if(page_number < 11){
      $(".pagination-10-back").addClass("disabled")
    }
    if(page_number == pageCount){
      $(".pagination-next").addClass("disabled")
    }
    if(page_number == 0 || page_number == 1){
      $(".pagination-prev").addClass("disabled")
    }
  }

  function range(i){return i?range(i-1).concat(i):[]}
  function range2(j, i){return i>=j?range2(j, i-1).concat(i):[]}

  function paginate(pageCount, opts, data, user_source){
    if (pageCount <= 15) {
      var source = $("#pagination-template").html();
      var template = Handlebars.compile(source);
      var context = {pages: range(pageCount)};
      var html = template(context);
    } else if (pageCount <= 37) {
      var source = $("#pagination-template-1-ellipsis").html();
      var template = Handlebars.compile(source);
      var context = { pages1: range(7),
                      ellipsisPage: Math.floor((7 + pageCount-6)/2),
                      pages2: range2(pageCount-6, pageCount)
                    };
      var html = template(context);
    } else {
      var midGroupStart = Math.ceil((1+pageCount)/2) - 2;
      var source = $("#pagination-template-2-ellipses-large").html();
      var template = Handlebars.compile(source);
      var context = { pages1: range(4),
                      ellipsisPage1: Math.floor((4 + midGroupStart)/2),
                      pages2: range2(midGroupStart, midGroupStart+4),
                      ellipsisPage2: Math.floor((midGroupStart+4 + pageCount-3)/2),
                      pages3: range2(pageCount-3, pageCount)
                    };
      var html = template(context);
    }
    //add the page bar on the bottom of the page
    $("#user-pagination").append(html);

    $('.pagination>li.pagination-page').on("click", function(){
      changePage(pageCount, $(this).data("page"), data, opts, user_source, $(this).hasClass('ellipsis'))
    }).filter('[data-page="1"]').addClass('active');

  }

//====================================================================================================
  function changePage(pageCount, pageNumber, data, opts, user_source, ellipsisClicked){
    $('.pagination>li.pagination-page').removeClass('active');
    $('.pagination>li.pagination-page').filter('[data-page="' + pageNumber + '"]').addClass('active');
    // data format = [object, object, object .. object]
    loadPosts(data.slice(pageNumber * opts.pageMax - opts.pageMax, pageNumber * opts.pageMax)
              ,opts, user_source);
    if (ellipsisClicked) {
      if (pageCount <= 37) {
        if (pageNumber <= 7 || pageNumber > pageCount - 7) {
          // fairly non-DRY, refactoring desired
          var source = $("#pagination-template-1-ellipsis").html();
          var template = Handlebars.compile(source);
          var context = { pages1: range(7),
                          ellipsisPage: Math.floor((7 + pageCount-6)/2),
                          pages2: range2(pageCount-6, pageCount)
                        };
        } else if (pageNumber <= 13) {
          var source = $("#pagination-template-1-ellipsis").html();
          var template = Handlebars.compile(source);
          var context = { pages1: range2(1, 13),
                          ellipsisPage: Math.floor((13 + pageCount)/2),
                          pages2: [pageCount]
                        };
        } else if (pageCount - pageNumber <= 12) {
          var source = $("#pagination-template-1-ellipsis").html();
          var template = Handlebars.compile(source);
          var context = { pages1: [1],
                          ellipsisPage: Math.floor((1 + pageCount - 12)/2),
                          pages2: range2(pageCount - 12, pageCount)
                        };
        } else {
          var source = $("#pagination-template-2-ellipses-medium").html();
          var template = Handlebars.compile(source);
          var context = { pages1: [1],
                          ellipsisPage1: 7,
                          pages2: range2(14,24),
                          ellipsisPage2: Math.floor((24 + pageCount)/2),
                          pages3: [pageCount]
                    };
        }
      // cases for over 37 pages:
      } else {
        if (pageNumber <= 4 || pageCount - pageNumber <= 3) {
          var midGroupStart = Math.ceil((1+pageCount)/2) - 2;
          var source = $("#pagination-template-2-ellipses-large").html();
          var template = Handlebars.compile(source);
          if (pageNumber <= 4) {
            var context = { pages1: range(4),
                            ellipsisPage1: pageNumber+5,
                            pages2: range2(midGroupStart, midGroupStart+4),
                            ellipsisPage2: Math.min(midGroupStart+5+pageNumber, pageCount-2),
                            pages3: range2(pageCount-3, pageCount)
                          };
          } else {
            var context = { pages1: range(4),
                            ellipsisPage1: (Math.max(3, midGroupStart-pageCount+pageNumber)),
                            pages2: range2(midGroupStart, midGroupStart+4),
                            ellipsisPage2: pageNumber-5,
                            pages3: range2(pageCount-3, pageCount)
                          };
          }
        } else {
          var firstOfEleven = Math.ceil( (1+pageCount) / 2) - 5;
          var beforeSmooshLeftUpperBound = (firstOfEleven-1) - (firstOfEleven-1) % 5 + 4;
          var beforeSmooshRightLowerBound = pageCount - ((firstOfEleven-1) - (firstOfEleven-1) % 5 - 1);
          if (pageNumber > beforeSmooshLeftUpperBound && pageNumber < beforeSmooshRightLowerBound) {
            var source = $("#pagination-template-2-ellipses-large").html();
            var template = Handlebars.compile(source);
            var context = { pages1: [1],
                            ellipsisPage1: firstOfEleven - 5 + ((pageNumber - firstOfEleven) % 5),
                            pages2: range2(firstOfEleven, firstOfEleven+10),
                            ellipsisPage2: firstOfEleven + 10 + 5 - ((firstOfEleven + 10 - pageNumber) % 5),
                            pages3: [pageCount]
                          };
          } else {
            var source = $("#pagination-template-3-ellipses").html();
            var template = Handlebars.compile(source);
            var minusMod5 = pageNumber - pageNumber % 5;
            if (pageNumber <= beforeSmooshLeftUpperBound) {
              var context = { pages1: [1],
                              ellipsisPage1: Math.max(3, pageNumber-5),
                              pages2: range2(minusMod5, minusMod5+4),
                              ellipsisPage2: pageNumber+5,
                              pages3: range2(pageCount - minusMod5 - 3, pageCount - minusMod5 + 1),
                              ellipsisPage3: Math.min(pageCount - minusMod5 + 6, pageCount-2),
                              pages4: [pageCount]
                            };
            } else {
              hiDelta = pageCount - minusMod5 - 4;
              var context = { pages1: range(1),
                              ellipsisPage1: Math.max(3, 1+hiDelta+minusMod5 - 5),
                              pages2: range2(1+hiDelta, 1+hiDelta+4),
                              ellipsisPage2: pageNumber-5,
                              pages3: range2(minusMod5, minusMod5+4),
                              ellipsisPage3: Math.min(pageNumber + 5, pageCount-2),
                              pages4: [pageCount]
                            };
            }
          }
        }
      }
      var html = template(context);
      $(".pagination").replaceWith(html);

      if (pageNumber <= 10) {
      $(".pagination-10-back").addClass("disabled");
      }
      if (pageCount - pageNumber < 10) {
      $(".pagination-10-ahead").addClass("disabled");
      }

      // When click on the pagination button:
      $(".pagination-page, .pagination>li.pagination-next, .pagination>li.pagination-prev, .pagination>li.pagination-10-back, .pagination>li.pagination-10-ahead").on("click", function(){

        var gotoPageNumber = -1;

        // only works if not disabled
        if (!$(this).hasClass("disabled")) {

          // when a page is clicked, reset prev button and next state
          $(".pagination-prev, .pagination-next").removeClass("disabled");
          // same with 10-back and 10-ahead
          $(".pagination-10-back, .pagination-10-ahead").removeClass("disabled");

          if ($(this).hasClass("pagination-next")){
            gotoPageNumber = parseInt($('.pagination>li.active').data("page"))+1
            disablePrevNextButton(gotoPageNumber, pageCount)
          } else if ($(this).hasClass("pagination-prev")){
            gotoPageNumber = parseInt($('.pagination>li.active').data("page"))-1
            disablePrevNextButton(gotoPageNumber, pageCount)
          } else if ($(this).hasClass("pagination-10-back")){
            gotoPageNumber = parseInt($('.pagination>li.active').data("page"))-10
            disablePrevNextButton(gotoPageNumber, pageCount)
          } else if ($(this).hasClass("pagination-10-ahead")){
            gotoPageNumber = parseInt($('.pagination>li.active').data("page"))+10
            disablePrevNextButton(gotoPageNumber, pageCount)
          } else {
            gotoPageNumber = $(this).data("page");
            disablePrevNextButton(gotoPageNumber, pageCount)
          }

          var nextEllipsisClicked = false;
          if (!($(".pagination-page[data-page="+ gotoPageNumber +"]").length) ||
              $(".pagination-page[data-page="+ gotoPageNumber +"]").hasClass('ellipsis')) {
            nextEllipsisClicked = true;
          }

          if (gotoPageNumber % 3 == 2){
            // Check if this page is clicked before, if yes, show already render info
            if ($(".pagination-page[data-page="+ gotoPageNumber +"]").data("load")== true){
              changePage(pageCount, gotoPageNumber, data, opts, user_source, nextEllipsisClicked)
            } else{
              // send another ajax request to load more data if this page is never clicked before, and show its loaded data
              changePage(pageCount, gotoPageNumber, data, opts, user_source, nextEllipsisClicked)

              // Need to preload filter user data
              var need_to_load_times = Math.ceil(dataCount / 30)
            }
          } else {
            changePage(pageCount, gotoPageNumber, data, opts, user_source, nextEllipsisClicked)
          }
        } else {
          // prevent refresh when clicking disabled
          event.preventDefault();
        }
      }).filter('[data-page="' + pageNumber + '"]').addClass('active');
    }
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



