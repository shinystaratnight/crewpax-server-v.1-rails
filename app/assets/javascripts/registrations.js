$(function(){

//*********************************************************************************************************
// Registration Form Personal Information Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $("#name").keypress(function(event){
    // prevent return key
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
      $('#email').focus();
    }
  });

  $("#name").on("blur", function(event) {
    // if (event.keyCode === 10 || event.keyCode === 13) {
    //   event.preventDefault();
    // }

    //Retrieve the info from user's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a user is already created and decide which url the ajax should send to(create/update)
    var user_id = $("#info").data("user-id");
    if (user_id == "") {
      var url = "/users";
      var method = "post";
    } else {
      var url = "/users/" + user_id;
      var method = "put";
    }
    var name = $("#name").text().trim();
    // There are two rounds of validations, front-end and back-end. Here's the front-end validation
    if (name == "") {
      $(this).addClass("invalid").next().show();
      return false;
    } else {
      $("#name-error").hide();
      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{user: {name: name}},
        success: function(response){
          if (response.id) {
            $("#info").data("user-id", response.id);
            $("#name").addClass("valid");
          } else {
            var errors = response.toString();
            $("#name-error").text("*"+ errors).show();
            $("#name").addClass("invalid");
          }
        }
      });
    };
      // return false;
  });

//=====================================================================================
  $("#phone").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var phone = $("#phone").text().trim().replace(/[^0-9]/g, '');
      if (phone == "") {
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } else {
        $("#phone-error").hide();

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{phone: phone}},
          success: function(response){
            $("#phone").addClass("valid");
            userCreated();
          },
          error: function(xhr){
            var errors = $.parseJSON(xhr.responseText).toString();
            $("#phone").addClass("invalid");
            $("#phone-error").text("*"+ errors).show();
          }
        });
      };
  });


//============================================================================================
  $("#email").keypress(function(event){
    // prevent return key
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
      $('#password').focus();
    }
  });

  $("#email").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var email = $("#email").text().trim();
    if (email == "") {
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
    } else {
      $("#email-error").hide();

      $.ajax({
        url:"/users/" + user_id,
        method:"put",
        dataType:"json",
        data:{user:{email: email}},
        success: function(response){
          $("#email").addClass("valid");
          userCreated();
        },
        error: function(xhr){
          var errors = $.parseJSON(xhr.responseText).error || $.parseJSON(xhr.responseText).toString();
          $("#email").addClass("invalid");
          $("#email-error").text("*"+ errors).show();

        }

      });
    }
  });



//============================================================================================
  $("#mailing_address").on("blur", function(){
    // Need to check if the address.id exists, if yes -> post, no-> put
    var address_id = $("#mailing_address_info").data("address-id");

    if (address_id == "") {
      var url = "/addresses";
      var method = "post";
    } else {
      var url = "/addresses/" + address_id;
      var method = "put";
    }

    var mailing_address = $("#mailing_address").text().trim();
    var type = "Mailing";
    var user_id = $("#info").data("user-id");

    if (mailing_address == "") {
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
    } else {
        $("#mailing-address-error").hide();
        $.ajax({
          url:url,
          method:method,
          dataType:"json",
          data:{address:{type:type, address_input:mailing_address, user_id:user_id}},
          success: function(response){
            if (response.id) {
              $("#mailing_address_info").data("address-id", response.id);
              $("#mailing_address").addClass("valid");
            }
          }
        });
    }
  });
//============================================================================================

  $("#billing_address").on("blur", function(){

    // Need to check if the address.id exists, if yes -> post, no-> put
    var address_id = $("#billing_address_info").data("billing-id");
    if (address_id == "") {
      var url = "/addresses";
      var method = "post";
    } else {
      var url = "/addresses/" + address_id;
      var method = "put";
    }

    var billing_address = $("#billing_address").text().trim();
    var type = "Billing";
    var user_id = $("#info").data("user-id");

    if (billing_address == "") {
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
    } else {
      $("#billing-address-error").hide();
      $.ajax({
        url:url,
        method:method,
        dataType:"json",
        data:{address:{type:type, address_input:billing_address, user_id:user_id}},
        success: function(response){
          if(response.id){
            $("#billing_address_info").data("billing-id", response.id)
            $("#billing_address").addClass("valid");
          }
        }
      });
    }

  });
//============================================================================================

  $("#shipping_address").on("blur", function(){
    // Need to check if the address.id exists, if yes -> post, no-> put
    var address_id = $("#shipping_address_info").data("shipping-id");

    if (address_id == "") {
      var url = "/addresses";
      var method = "post";
    } else {
      var url = "/addresses/" + address_id;
      var method = "put";
    }

    var shipping_address = $("#shipping_address").text().trim();
    var type = "Shipping";
    var user_id = $("#info").data("user-id");

    if (shipping_address == "") {
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
    } else {
      $("#shipping-address-error").hide();
      $.ajax({
        url:url,
        method:method,
        dataType:"json",
        data:{address:{type:type, address_input:shipping_address, user_id:user_id}},
        success: function(response){
          if(response.id){
            $("#shipping_address_info").data("shipping-id", response.id);
            $("#shipping_address").addClass("valid");
          }
        }
      });
    }
  });
//===================================================================================
  // To trigger Bootstrap Switch
  $("[name='my-checkbox']").bootstrapSwitch();

//=====================Has a traffic control ticket? =========================================================
  stateSwitch($('#traffic_control'))

//=================Has a vehicle?============================================================

  stateSwitch($('#vehicle'))
//===================================================================================
  $("#upload_picture").on("change", function(){
    var formData = new FormData();
    var user_id = $("#info").data("user-id");
    $input=$("#upload_picture");
    formData.append("user[image]",$input[0].files[0]);

    $.ajax({
      url: "/users/"+ user_id,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      method: 'put',
      success: function(response){
        $("#profile_pic").text("Profile picture saved (refresh page to view)").show();

      }
    });
  });




//===================================================================================
  $("#password").keypress(function(event){
    // prevent return key
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
      $('#pw_confirmation').focus();
    }
  });

  $("#password").on("blur", function(){
    var password = $(this).text().trim();
    if(password == ""){
      $(this).addClass("invalid");
      $("#password-error").show();
      return false;
    } else {
      $("#password").addClass("valid");
      userCreated();
      $("#password-error").hide();
    }
  });

    $("#password").pStrength({
      bind: 'keyup change',
      changeBackground: false,
      onPasswordStrengthChanged: function(passwordStrength, strengthPercentage) {
        if ($(this).text()) {
          $.fn.pStrength('changeBackground',$(this), passwordStrength);
        } else {
          $.fn.pStrength('resetStyle', $(this));
        }
      }
    });




//===================================================================================
  $("#pw_confirmation").keypress(function(event){
    // prevent return key
    if (event.keyCode === 10 || event.keyCode === 13) {
      event.preventDefault();
      var password_confirmation = $(this).text().trim();
      var password = $("#password").text().trim();
      var user_id = $("#info").data("user-id");

      if (password_confirmation == "") {
        $(this).addClass("invalid");
        $("#pw-confirmation-error").show();
        return false;
      } else if(password == password_confirmation) {
        $("#pw-confirmation-error").hide();

          $.ajax({
            url:"/users/" + user_id,
            method:"put",
            dataType:"json",
            data:{user:{password: password_confirmation}},
            success: function(response){
            $("#pw_confirmation").addClass("valid");
            userCreated();
            }
          });
        $('#phone').focus();
      } else {
        $("#pw-confirmation-error").show();
        return false;

      }
    }
  });

  $("#pw_confirmation").on("blur", function(){
    var password_confirmation = $(this).text().trim();
    var password = $("#password").text().trim();
    var user_id = $("#info").data("user-id");

    if (password_confirmation == "") {
      $(this).addClass("invalid");
      $("#pw-confirmation-error").show();
      return false;
    } else if(password == password_confirmation) {
      $("#pw-confirmation-error").hide();

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{password: password_confirmation}},
          success: function(response){
          $("#pw_confirmation").addClass("valid");
          userCreated();
          }
        });
      $('#phone').focus();
    } else {
      $("#pw-confirmation-error").show();
      return false;

    }
  });

  $("#pw_confirmation").pStrength({
    bind: 'keyup change',
    changeBackground: false,
    onPasswordStrengthChanged: function(passwordStrength, strengthPercentage) {
      if($(this).text()){
        $.fn.pStrength('changeBackground',$(this), passwordStrength);
        $('#pw_confirmation_strength_precentage').text('Your password strength is ' + strengthPercentage + '%.')
      } else {
        $.fn.pStrength('resetStyle', $(this));
      }
      },
    onValidatePassword: function(strengthPercentage){
      $('#pw_confirmation_strength_precentage').text(
      $('#pw_confirmation_strength_precentage').text() + ' Great, now you can continue to register!'

      );
    }
  });
//===================================================================================
// this will display an alert that the four necessary fields have been successfully saved
// and that the user has been created, and reveal the rest of the form
function userCreated() {
  if ($("#password").hasClass("valid") && $("#pw_confirmation").hasClass("valid") && $("#email").hasClass("valid") && $("#name").hasClass("valid"))
  {
    $("#profile-success").fadeIn();
    setTimeout(function() {
      $("#profile-success").fadeOut();
    }, 3000);
    $(".continue-registration").fadeIn();
  }
};


//============================forms for links==========================================


$("#imdb").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var imdb = $("#imdb").text().trim();
      // if (imdb == "") {
      //   $(this).addClass("invalid");
      //   $(this).next().show();
      //   return false;
      // } else {
        $("#imdb-error").hide();

        // prepend with http:// if necessary to offest Rails'
        // relative link assumption habits
        if (imdb != "" && imdb.substring(0,7) != "http://") {
          imdb = "http://" + imdb;
        }

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{imdb: imdb}},
          success: function(response){
            $("#imdb").addClass("valid");
            userCreated();
          },
          error: function(xhr){
            var errors = $.parseJSON(xhr.responseText).toString();
            $("#imdb").addClass("invalid");
            $("#imdb-error").text("*"+ errors).show();
          }
        });
      // };
  });

$("#youtube").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var youtube = $("#youtube").text().trim();
      // if (youtube == "") {
      //   $(this).addClass("invalid");
      //   $(this).next().show();
      //   return false;
      // } else {
        $("#youtube-error").hide();

        // prepend with http:// if necessary to offest Rails'
        // relative link assumption habits
        if (youtube != "" && youtube.substring(0,7) != "http://") {
          youtube = "http://" + youtube;
        }

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{youtube: youtube}},
          success: function(response){
            $("#youtube").addClass("valid");
            userCreated();
          },
          error: function(xhr){
            var errors = $.parseJSON(xhr.responseText).toString();
            $("#youtube").addClass("invalid");
            $("#youtube-error").text("*"+ errors).show();
          }
        });
      // };
  });

$("#vimeo").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var vimeo = $("#vimeo").text().trim().val();
      // if (vimeo == "") {
      //   $(this).addClass("invalid");
      //   $(this).next().show();
      //   return false;
      // } else {
        $("#vimeo-error").hide();

        // prepend with http:// if necessary to offest Rails'
        // relative link assumption habits
        if (vimeo != "" && vimeo.substring(0,7) != "http://") {
          vimeo = "http://" + vimeo;
        }

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{vimeo: vimeo}},
          success: function(response){
            $("#vimeo").addClass("valid");
            userCreated();
          },
          error: function(xhr){
            var errors = $.parseJSON(xhr.responseText).toString();
            $("#vimeo").addClass("invalid");
            $("#vimeo-error").text("*"+ errors).show();
          }
        });
      // };
  });

$("#linkedin").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var linkedin = $("#linkedin").text().trim();
      // if (linkedin == "") {
      //   $(this).addClass("invalid");
      //   $(this).next().show();
      //   return false;
      // } else {
        $("#linkedin-error").hide();

        // prepend with http:// if necessary to offest Rails'
        // relative link assumption habits
        if (linkedin != "" && linkedin.substring(0,7) != "http://") {
          linkedin = "http://" + linkedin;
        }

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{linkedin: linkedin}},
          success: function(response){
            $("#linkedin").addClass("valid");
            userCreated();
          },
          error: function(xhr){
            var errors = $.parseJSON(xhr.responseText).toString();
            $("#linkedin").addClass("invalid");
            $("#linkedin-error").text("*"+ errors).show();
          }
        });
      // };
  });

$("#facebook").on("blur", function(){
    var user_id = $("#info").data("user-id");
    var facebook = $("#facebook").text().trim();
      // if (facebook == "") {
      //   $(this).addClass("invalid");
      //   $(this).next().show();
      //   return false;
      // } else {
        $("#facebook-error").hide();

        // prepend with http:// if necessary to offest Rails'
        // relative link assumption habits
        if (facebook != "" && facebook.substring(0,7) != "http://") {
          facebook = "http://" + facebook;
        }

        $.ajax({
          url:"/users/" + user_id,
          method:"put",
          dataType:"json",
          data:{user:{facebook: facebook}},
          success: function(response){
            $("#facebook").addClass("valid");
            userCreated();
          },
          error: function(xhr){
            var errors = $.parseJSON(xhr.responseText).toString();
            $("#facebook").addClass("invalid");
            $("#facebook-error").text("*"+ errors).show();
          }
        });
      // };
  });


//*********************************************************************************************************
// Registration Form Notification Settings for Job Postings Section
//********************************************************************************************************

$(".notification-panel").on("change", function(){
    var user_id = $('#notification_form').data("user-id");

    var setting = "";
    if ($("#notify_never").prop('checked')) {
      setting = "never";
    } else if ($("#notify_always").prop('checked')) {
      setting = "always";
    } else {
      setting = "selected_roles";   // default
    }

    $.ajax({
      url:"/users/" + user_id,
      method:"put",
      dataType:"json",
      data:{user:{notify_when_job_posted: setting}},
      success: function(response){
        userCreated();
      }
    });
  });




//==========================================================================================================
//*********************************************************************************************************
// Registration Form Department Section
//********************************************************************************************************
// ==============New adding Union with permit and member status ==================================
//deletes all roles when permit or member fields are un-checked
  function changeUnionStatus(checkbox, union_id){
    var union_name = $(checkbox).data("union-name");
    $.each($("#" + union_name +"_roles").find(".roles:checkbox:checked"),function(index, checkbox){
      var role_id = $(checkbox).data("rolez-id");
      var eligibility_id = $(checkbox).data("eligibility-id");
      var user_id = $(checkbox).data("user-id");
      ajaxDeleteEligibility(union_id, role_id, eligibility_id);
      ajaxDeleteLabel(role_id, user_id);
      $(checkbox).prop("checked", false);
    });

  };



// deletes all roles when member status is removed
  $(".union_member").on("click", function(){
    var union_id = $(this).parent().data("union-id");
    if($(this).is(":checked")== false){
    changeUnionStatus($(this), union_id);
    }
  });

 // shows field for number of permit days
  $(".union_permit_days").on("click", function(){
    var union_name = $(this).data("union-name");
    if ($(this).is(":checked")) {
      $("#"+ union_name +"_number_days").show();
      $("#"+ union_name +"_permit_days").show();
      $("#"+ union_name +"_permit_days").on("blur", function(){
        var data = $("#"+ union_name +"_permit_days").text().trim();
        $("#"+union_name+"_permit").val(data);
      });

    } else {
      // deletes all roles when permit status is unchecked and removed
      $("#"+ union_name +"_number_days").hide();
      $("#"+ union_name +"_permit_days").hide();
      var union_id = $("#"+union_name+"Status").data("union-id");
      changeUnionStatus($(this), union_id)
    }
  });


  // ensures member or permit is checked before saving role (twice though, oops)
  $(".union_roles").find(".roles").on("click",function(){
    var checkbox = $(this);
    var union_name = checkbox.data("union-name");
    var union_id = checkbox.data("union-id");
    var role_id = checkbox.data("rolez-id"); // role-id didn't work for some reason.
    var user_id = checkbox.data("user-id") || $("#info").data("user-id");
    if ($("#"+union_name+"_member").is(":checked")) {
       var data = $("#"+union_name+"_member").val();
      if (checkbox.is(":checked")) {
        ajaxMember(data, union_id, role_id, checkbox);
        ajaxCreateLabel(role_id, user_id);
      } else {
        var eligibility_id = checkbox.data("eligibility-id");
        ajaxDeleteLabel(role_id, user_id);
        ajaxDeleteEligibility(union_id, role_id, eligibility_id)
      }
    } else if ($("#"+union_name+"_permit").is(":checked")){
      var data = $("#"+union_name+"_permit").val();
      if (checkbox.is(":checked")){
        ajaxPermit(data, union_id, role_id, checkbox);
        ajaxCreateLabel(role_id, user_id);
      }else{
        var eligibility_id = checkbox.data("eligibility-id");
        ajaxDeleteEligibility(union_id, role_id, eligibility_id);
        ajaxDeleteLabel(role_id, user_id);
      }
    // }else if($(checkbox).data("union-has-member") == true || $(checkbox).data("union-has-permit")==true){
    //   alert("You must indicate whether you are a member or you have a permit")

    } else if($(checkbox).data("union-has-member") == true ){
      alert("You must indicate that you are a member");
      checkbox.attr('checked', false);

    } else if($(checkbox).data("union-has-permit") == true){
      alert("You must indicate that you have a permit");
      checkbox.attr('checked', false);
    }
  });

// When users only want to update the permit days
  $(".permit_days_entry").on("blur", function(){

    var union_name = $(this).data("union-name");
    if($("#"+union_name+"_roles").find(".roles:checkbox:checked")){
      $.each($("#"+union_name+"_roles").find(".roles:checkbox:checked"), function(index, checkbox){
        var role_id = $(checkbox).data("rolez-id");
        var eligibility_id = $(checkbox).data("eligibility-id");
        var user_id = $(checkbox).data("user-id")|| $("#info").data("user-id");
        var new_data = $("#"+union_name+"_permit_days").text().trim();
        var union_id = $(checkbox).data("union-id");
        ajaxUpdatePermit(new_data, role_id, eligibility_id, user_id, union_id)

      })

    }

  })



//=================================For All Unions ==============================================================

  $(".roles").on("click", function(){
      var checkbox = $(this);
      var user_id = checkbox.data("user-id")|| $("#info").data("user-id");
      var union_id = checkbox.data("union-id");
      var role_id = checkbox.data("rolez-id"); // role didn't work but rolez does?
      var eligibility_id = checkbox.data("eligibility-id");
      var union_name = checkbox.data("union-name");

      //if union does not have member status or permit status

      if($(checkbox).data("union-has-member")== false && $(checkbox).data("union-has-permit")==false){
        if (checkbox.is(":checked")) {
          ajaxRoles(union_id, role_id, user_id, checkbox);
          ajaxCreateLabel(role_id, user_id);
        } else {
          var eligibility_id = checkbox.data("eligibility-id");
          ajaxDeleteLabel(role_id, user_id);
          ajaxDeleteEligibility(union_id, role_id, eligibility_id)
        }
      }
  });


//*********************************************************************************************************
// Registration Form Calendar Section
//********************************************************************************************************



  $("#day .btn").on("click", function(){
    var availability_id = $(this).data("availability-id")
    if (availability_id == 0) {
      var day = $(this).data("day");
      var date = $(this).data("date");
      var week = $("#weeklyDatePicker").val();
      ajaxAddAvailability(day,date,week,$(this));
    } else if (availability_id > 0) {
      var day = $(this).data("day");
      var date = $(this).data("date");
      var week = $("#weeklyDatePicker").val();
      ajaxDeleteAvailability(day,date,week,availability_id, $(this))
    }

  });

  $("#weeklyDatePicker").datepicker({
    format: "mm-dd-yyyy",
    todayHighlight: true,
    forceParse : false,
    autoclose:true,
    disableTouchKeyboard:false
  });

  //Get the value of Start and End of Week in the calendar
  $("#weeklyDatePicker").on("change.dp",tdp);
  $('.avail-collapse-toggle').on('click', tdp);

  function tdp (){
    var value = $("#weeklyDatePicker").val();
    // case of one date from value picker
    if ($(this).hasClass('avail-collapse-toggle')) {
      value = moment().format("MM-DD-YYYY");
    // case of two dates already there
    }

      var sunday = moment(value, "MM/DD/YYYY").day(0).format("YYYY-MM-DD");
      var saturday = moment(value, "MM/DD/YYYY").day(6).format("YYYY-MM-DD");

    // alert($(this).attr("aria-expanded"));
    var user_id = $("#info").data("user-id");

    $("#weeklyDatePicker").val(sunday + " - " + saturday);
    $("#date_range").text($("#weeklyDatePicker").val())
    $("#sunday").data("date", sunday);
    $("#monday").data("date", moment(value, "MM/DD/YYYY").day(1).format("YYYY-MM-DD"));
    $("#tuesday").data("date",moment(value, "MM/DD/YYYY").day(2).format("YYYY-MM-DD"));
    $("#wednesday").data("date",moment(value, "MM/DD/YYYY").day(3).format("YYYY-MM-DD"));
    $("#thursday").data("date", moment(value, "MM/DD/YYYY").day(4).format("YYYY-MM-DD"));
    $("#friday").data("date",moment(value, "MM/DD/YYYY").day(5).format("YYYY-MM-DD") );
    $("#saturday").data("date",saturday );

      // Using ajax to get user's appointment info
      $.ajax({
        url: "/users/"+ user_id +"/appointments",
        method: "get",
        dataType: "json",
        data: {appointment: {user_id: user_id}},
        success: function(response){
          //if a user does not have any availabilities, all the buttons are red
          if (response.length == 0) {
            $.each($("#day .btn"), function(i, b){
              var button = $(this);
              button.removeClass("btn-success").addClass("btn-danger");
            });
          } else {
              var appointment_dates = [];
              var appointments_info = [];
              $.grep(response, function(e){
                appointment_dates.push(e.date)
                appointments_info.push({date: e.date, availability_id: e.id})
              });
              $.each($("#day .btn"), function(i,b){
                //check each buttons to see if their data-date attributes are the same as the availiabilities from database
                //If not the same, will return -1, and avaialability-id will remain empty.
                if ($.inArray($(b).data("date"), appointment_dates) == -1){
                  $(b).removeClass("btn-success").addClass("btn-danger");
                  $(b).data("availability-id", "")
                }else{
                  $(b).removeClass("btn-danger").addClass("btn-success")
                  // Need to add the availability id to the availability-id data attributes
                  $.map(appointments_info,function(info){
                    if (info.date == $(b).data("date")){
                      $(b).data("availability-id", info.availability_id)
                    }
                  });
                }
              });
          }
        }
      });









  };



//*********************************************************************************************************
// Registration Form Certificate Section
//********************************************************************************************************
  $(".chosen-select").chosen({width: "100%"});
  $("#create-certificate").on("change", function(evt, params){
    var selected = params.selected
    var deselected = params.deselected
      if (selected >0 ) {
        ajaxCreateCertifiable(selected,$(".search-choice-close"))
      } else if (deselected > 0) {
        ajaxdeleteCertifiable(deselected, $(".search-choice-close"))
      }
  });



//*********************************************************************************************************
// Registration Files Upload Section
//********************************************************************************************************
//==============================Upload New File==============================================================
  $("#file_upload_form").on("submit", function(event){
    var client_email = $("#recipient_email").val().trim();
    var user_id = $("#info").data("user-id");
    var file_type = $("#selected_file :selected").val()
    var formData = new FormData();
    $input = $("#upload_file");

    if ($input[0].files.length == 0) {
      $("#fail_msg").text("Attachment can't be blank, please choose your file").show().delay(3000).fadeOut(1000)
      return false;
    }
    else if (client_email == "") {
      $("#fail_msg").text("Recipient email can't be blank").show().delay(3000).fadeOut(1000)
      return false;
    } else {
      var file_name = $input[0].files[0].name
      var name = user_id + "_" + file_type + "_" + file_name;
      formData.append("attachment[file]", $input[0].files[0]);
      $("#fail_msg").hide();
      event.preventDefault();
      $("#submit_button").hide();
      $("#uploading").show();
        $.ajax({
          url:"/attachments",
          method: "post",
          dataType: "json",
          data:{attachment:{user_id:user_id, type:file_type, name: name,file: "null", client_email:client_email}},
          success: function(response){
            $("#selected_file :selected").data("attachment-id",response.id)
            var attachment_id = $("#selected_file :selected").data("attachment-id");
              if (response.id > 0) {
                $.ajax({
                  url:"/attachments/" + attachment_id,
                  method: "put",
                  dataType: "json",
                  data:formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success: function(response){
                    if (response.file_share_link === undefined) {
                      $("#fail_msg").text(response).show().delay(3000).fadeOut(1000)
                      $("#uploading").hide();
                      $("#submit_button").show();
                    } else {
                      $("#success_upload").show().delay(3000).fadeOut(1000);
                      $("#uploading").hide();
                      $("#submit_button").show();
                      var $docs_upload = $("#file_template").clone();
                        $docs_upload.find("#document_info").data("file-id", response.id);
                        $docs_upload.find("#document_name").text(response.type)
                        $docs_upload.find(".ajax_document_delete").data("attachment-id", response.id);
                        $docs_upload.find(".document_share_link").attr("href", response.file_share_link);
                        $("#new_file").append($docs_upload.show());
                        $("#success_msg").text(response.type + " " +"has been sent to" + " " +response.client_email + ".").show().delay(3000).fadeOut(1000);
                    }
                  }
                });
              } else {
                $("#fail_msg").text(response).show().delay(3000).fadeOut(1000)
                $("#uploading").hide();
                $("#submit_button").show();
              }
            }

        });
    }

  });

//=========================== Delete already uploaded file ========================================================================
  $("#new_file").on("click", ".ajax_document_delete",function(){
    $(this).parentsUntil("#file_template").hide()
    $("#ajax_document_deleting").show();
    var attachment_id = $(this).data("attachment-id")
    ajaxDeleteNewDocument(attachment_id, $("#ajax_document_deleting"), $(this))
  });




//============== Email existing uploaded files to mutliple users================================================================
  $("#new_file").on("click",".uploaded_file",function(){
    // for sending multiple emails for the same files. Scenerio one a user clicks a file, and send multiple emails.
    //First reset every data-clickable attribute to none
    resetDocumentDataAttr($("#new_file .uploaded_file"))
    // add a data attribute indicates which existing_file is click
    $(this).data("clickable", "true")
    // Use color to indicate which file is selected by the user
    labelSeletedDocument($(this))

  });

  $("#email_form").on("submit", function(event){
    var new_client_email = $("#new_client_email").val().trim();
    if (new_client_email == "") {
      $("#fail_new_client_msg").text("Recipient email can't be blank").show().delay(3000).fadeOut(1000);
      return false;
    }
    event.preventDefault();
    $("#email_sent").hide();
    $("#sending").show();

    $.each($('.uploaded_file'), function(i,element){
      if ($(this).data("clickable") == "true") {
        var attachment_id = $(this).find(".file_info").data("file-id");
        var file = $(this);
        $.ajax({
          url:"/attachments/" + attachment_id,
          method:"put",
          dataType: "json",
          data:{attachment:{client_email:new_client_email}},
          success: function(response){
            if (response.id > 0) {
              $("#success_sent").show().delay(3000).fadeOut(1000);
              $("#email_sent").show();
              $("#sending").hide();
              $("#success_new_client_msg").text(response.type + " has been successfully sent to " + response.client_email + ".").show().delay(3000).fadeOut(1000);
            } else {
              $("#fail_new_client_msg").text(response).show().delay(3000).fadeOut(1000)
              $("#sending").hide();
              $("#email_sent").show();
            }
          }

        });
      }

    });


  });
//======================================Small Calendar Helper========================================
  $(".small-cal-browse").on('click', function(e) {
    $(this).parent().parent().addClass('browsing');
  });



});



//============================Common ajax call for sending data ================================================
  function ajaxUpdatePermit(new_data, role_id, eligibility_id, user_id, union_id){
    $.ajax({
      url: "/eligibilities/" + eligibility_id,
      method: "put",
      dataType: "json",
      data:{eligibility:{permit_days: new_data, id: eligibility_id, user_id: user_id, role_id: role_id, union_id: union_id}},
      success:function(response){
      }
    });
  }


  function ajaxDeleteEligibility(union_id, role_id,eligibility_id){
    var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities/" + eligibility_id,
      method: "delete",
      dataType: "json",
      data:{eligibility:{union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){

      }
    });
  }


  function ajaxDeleteLabel(role_id, user_id){
    // var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/users/"+ user_id,
      method: "delete",
      dataType:"json",
      data:{user:{roles_ids:[role_id]}},
      success: function(response){
      }

    });
  }

  function ajaxCreateLabel(role_id, user_id){
    // var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/users/"+ user_id,
      method: "put",
      dataType:"json",
      data:{user:{roles_ids:[role_id]}},
      success: function(response){


      }
    });
  }

  function ajaxRoles(union_id, role_id, user_id, checkbox){
    // var user_id = $(checkbox).data("user-id");
    $.ajax({
      url:"/eligibilities",
      method: "post",
      dataType: "json",
      data:{eligibility:{union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){
        checkbox.data("eligibility-id",response.id);
      }
    });
  }


  function ajaxMember(data, union_id, role_id, checkbox){
    var user_id = $(checkbox).data("user-id") || $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities",
      method:"post",
      dataType:"json",
      data:{eligibility:{member:data, union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){
        checkbox.data("eligibility-id",response.id);
      }
    });
  }

  function ajaxPermit(data, union_id, role_id, checkbox){
    var user_id = $(checkbox).data("user-id")||$("#info").data("user-id");
    $.ajax({
      url:"/eligibilities",
      method: "post",
      dataType:"json",
      data: {eligibility:{permit_days: data, union_id: union_id, user_id:user_id,role_id: role_id}},
      success: function(response){
        checkbox.data("eligibility-id",response.id);

      }
    });
  }

  function ajaxAddAvailability(day,date,week,checkbox){
    var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/users/" + user_id + "/appointments",
      method: "post",
      dataType:"json",
      data:{appointment:{day: day, user_id: user_id, date: date, week:week}},
      success: function(response){
        checkbox.removeClass("btn-danger").addClass("btn-success")
        checkbox.data("availability-id", response.id)
      }
    })

  }

  function ajaxDeleteAvailability(day,date,week,availability_id,checkbox){
    $.ajax({
      url: "/appointments/" + availability_id,
      method: "delete",
      dataType: "json",
      data:{appointment:{day: day, id: availability_id, date:date, week:week}},
      success: function(response){
        checkbox.data("availability-id", "")
        checkbox.removeClass("btn-success").addClass("btn-danger");

      }
    });

  }


  function ajaxCreateCertifiable(selected_certificate,selected_option){
    var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/certifiables",
      method: "post",
      dataType: "json",
      data:{certifiable:{user_id: user_id, certificate_id: selected_certificate}},
      success: function(response){
        selected_option.data("certifiable-id", response.id)

      }
    });

  }

  function ajaxdeleteCertifiable(deselected,deselected_option){
    var user_id = $("#info").data("user-id");
    var certifiable_id = $(".search-choice-close").data("certifiable-id");

    $.ajax({
      url:"/certifiables/"+ certifiable_id,
      method: "delete",
      dataType: "json",
      data:{certifiable:{user_id: user_id, id: certifiable_id, certificate_id:deselected}},
      success: function(response){
        deselected_option.data("certifiable-id", "")

      }
    });
  }




  function labelSeletedDocument(user_docs){
    $.each($(user_docs), function(i,element){
      if($(element).data("clickable")=="true"){
        $(this).find(".file_info").find("i").css({"color": "#5cb85c"})
        $(this).find(".file_info").addClass("selected_document")
      }
    });
  }

  function resetDocumentDataAttr(user_documents){
      $.each($(user_documents), function(i,element){
        $(element).data("clickable", "")
        $(this).find(".file_info").removeClass("selected_document");
        $(this).find(".file_info").find("i").css({"color": "black"})
    });

  }


  function stateSwitch(section){
    $(section).on('switchChange.bootstrapSwitch',
    function(event, state) {
      if ($(section).data("section") == "traffic_control") {
        var data = {user: {has_traffic_control_ticket: state}}
      } else {
        var data = {user: {has_vehicle: state}}
      }
      var user_id = $("#info").data("user-id");
      $.ajax({
        url:"/users/"+ user_id,
        method: "put",
        dataType: "json",
        data: data,
        success: function(response) {
        }
      });
    });
  }

























