$(function(){

//*********************************************************************************************************
// Registration Form Personal Information Section 
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $("#name").on("blur", function(){
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
    var phone = $("#phone").text().trim();
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
        },
        error: function(xhr){
          var errors = $.parseJSON(xhr.responseText).toString();
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

//===================================================================================

  $('#traffic_control').on('switchChange.bootstrapSwitch', 
    function(event, state) {  
      var user_id = $("#info").data("user-id");
      $.ajax({
        url:"/users/"+ user_id,
        method: "put",
        dataType: "json",
        data: {user: {has_traffic_control_ticket: state}},
        success: function(response) {
        }
      });
    });
//===================================================================================
  $('#vehicle').on('switchChange.bootstrapSwitch', 
    function(event, state) {
      var user_id = $("#info").data("user-id");
      $.ajax({
        url:"/users/"+ user_id,
        method: "put",
        dataType: "json",
        data: {user: {has_vehicle: state}},
        success: function(response) {
        }
      });
    });
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
      success: function(){
        $("#profile_pic").text("Profile picture saved").show();
       
      }
    });    
  });




//===================================================================================
  $("#password").on("blur", function(){
    var password = $(this).text().trim();
    if(password == ""){
      $(this).addClass("invalid");
      $("#password-error").show();
      return false;
    } else {
      $("#password").addClass("valid");
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
          }
        });
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
      } else {
        $.fn.pStrength('resetStyle', $(this));
      }
        $('#pw_confirmation_strength_precentage').text('Your password strength is ' + strengthPercentage + '%.')    
      },
    onValidatePassword: function(strengthPercentage){
      $('#pw_confirmation_strength_precentage').text(
      $('#pw_confirmation_strength_precentage').text() + ' Great, now you can continue to register!'

      );
    }
  });

//==========================================================================================================
//*********************************************************************************************************
// Registration Form Department Section
//********************************************************************************************************  
//==================Group One DGC ============================================================================================= 
// Data attributes for union-id 
  $("#DGC").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
   
  }); 
  
  $("#dgc_permit").on("click", function(){
    if ($(this).is(":checked")) {
      $("#dgc_number_days, #permit_days").show();
      $("#permit_days").on("blur", function(){
        var data = $("#permit_days").text().trim();
        $("#dgc_permit").val(data);
      });
    } else {
      $("#dgc_number_days, #permit_days").hide();
    }
  });

  $(".roles").on("click",function(){
    if ($("#dgc_member").is(":checked")) {
      var data = $("#dgc_member").val();
      var union_id = $("#DGC").data("union-id");
      var role_id = $(this).prev().text();
      $(this).data("role-id", role_id);
      if ($(this).is(":checked")) {
        ajaxMember(data, union_id, role_id, $(this)); 
        ajaxCreateLabel(role_id);  
      } else {  
        var eligibility_id = $(this).data("eligibility-id");
        ajaxDeleteEligibility(union_id, role_id,eligibility_id);
        ajaxDeleteLabel(role_id);
      }    
    } 
    else if ($("#dgc_permit").is(":checked")) {
      var data = $("#dgc_permit").val()
      var union_id = $("#DGC").data("union-id");
      var role_id = $(this).prev().text();
      $(this).data("role-id", role_id);
      if ($(this).is(":checked")) {
        ajaxPermit(data, union_id, role_id, $(this)); 
        ajaxCreateLabel(role_id);  
      } else {  
        var eligibility_id = $(this).data("eligibility-id");
        ajaxDeleteEligibility(union_id, role_id,eligibility_id);
        ajaxDeleteLabel(role_id)
      } 
    } else {
      alert("You must indicate whether you are a member or you have a permit")
    }

      
  });
    
  
//===========================For IATSE========================================================
  $("#IATSE").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
   
  }); 


  $("#iatse_permit").on("click", function(){
    if ($(this).is(":checked")) {
      $("#iatse_number_days, #iatse_permit_days").show();
      $("#iatse_permit_days").on("blur", function(){
        var data = $("#iatse_permit_days").text().trim();
        $("#iatse_permit").val(data);
      });
    } else {
      $("#iatse_number_days, #iatse_permit_days").hide();
    }
  });
 
  $(".IATSE_roles").on("click", function(){
    if ($("#iatse_member").is(":checked")) {
      var data = $("#iatse_member").val();
      var union_id = $("#IATSE").data("union-id");
      var role_id = $(this).prev().text();
      $(this).data("role-id", role_id);
        if ($(this).is(":checked")) {
          ajaxMember(data, union_id, role_id, $(this)); 
          ajaxCreateLabel(role_id);  
        } else {  
          var eligibility_id = $(this).data("eligibility-id");
          ajaxDeleteEligibility(union_id, role_id,eligibility_id);
          ajaxDeleteLabel(role_id);
        }    
    } else if ($("#iatse_permit").is(":checked")) {
      var data= $("#iatse_permit").val()
      var union_id = $("#IATSE").data("union-id");
      var role_id = $(this).prev().text();
      $(this).data("role-id", role_id);
        if ($(this).is(":checked")) {
          ajaxPermit(data, union_id,role_id, $(this)); 
          ajaxCreateLabel(role_id);  
        } else {  
          var eligibility_id = $(this).data("eligibility-id");
          ajaxDeleteEligibility(union_id, role_id,eligibility_id);
          ajaxDeleteLabel(role_id)
        } 
    } else {
      alert("You must indicate whether you are a member or you have a permit")
    }

  });
  

//=================================For ACFC ============================================================== 
  $("#ACFC").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
    
  });
  
  $(".ACFC_roles").on("click", function(){
    var union_id = $("#ACFC").data("union-id");
    var role_id = $(this).prev().text();
    $(this).data("role-id", role_id);
    if ($(this).is(":checked")) {
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    } else {
      var eligibility_id = $(this).data("eligibility-id");
      ajaxDeleteLabel(role_id);
      ajaxDeleteEligibility(union_id, role_id, eligibility_id)
    }
  });
  

//=================================For TEAMSTERS===============================================================
  $("#TEAMSTERS").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
  });

  $(".TEAMSTERS_roles").on("click", function(){
    var union_id = $("#TEAMSTERS").data("union-id");
    var role_id = $(this).prev().text();
    $(this).data("role-id", role_id);
      if ($(this).is(":checked")) {
        ajaxRoles(union_id, role_id, $(this));
        ajaxCreateLabel(role_id);
      } else {
        var eligibility_id = $(this).data("eligibility-id");
        ajaxDeleteLabel(role_id);
        ajaxDeleteEligibility(union_id, role_id, eligibility_id)
      }
  });


//=================================For UBCP ======================================================================
  $("#UBCP").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
  });


  $(".UBCP_roles").on("click", function(){
    var union_id = $("#UBCP").data("union-id");
    var role_id = $(this).prev().text();
    $(this).data("role-id", role_id);
    if ($(this).is(":checked")) {
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    } else {
      var eligibility_id = $(this).data("eligibility-id");
      ajaxDeleteLabel(role_id);
      ajaxDeleteEligibility(union_id, role_id, eligibility_id)
    }
  });


//=================================For ACTRA =======================================================================
 $("#ACTRA").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
  });

  $(".ACTRA_roles").on("click", function(){
    var union_id = $("#ACTRA").data("union-id");
    var role_id = $(this).prev().text();
    $(this).data("role-id", role_id);
    if ($(this).is(":checked")) {
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    } else {
      var eligibility_id = $(this).data("eligibility-id");
      ajaxDeleteLabel(role_id);
      ajaxDeleteEligibility(union_id, role_id, eligibility_id)
    }
  });



//==================================For Non Union =====================================================================
  $("#NON_UNION").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
  });

  $(".NON_UNION_roles").on("click", function(){
    var union_id = $("#NON_UNION").data("union-id");
    var role_id = $(this).prev().text();
    $(this).data("role-id", role_id);
    if ($(this).is(":checked")) {
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    } else {
      var eligibility_id = $(this).data("eligibility-id");
      ajaxDeleteLabel(role_id);
      ajaxDeleteEligibility(union_id, role_id, eligibility_id)
    }
  });

//*********************************************************************************************************
// Registration Form Calender Section
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
    format: "mm/dd/yyyy",
    todayHighlight: true,
    forceParse : false,
    autoclose:true
    
  });

  //Get the value of Start and End of Week
  $("#weeklyDatePicker").on("change.dp",function(){

    var value = $("#weeklyDatePicker").val();
    var sunday = moment(value, "MM/DD/YYYY").day(0).format("YYYY-MM-DD")
    var saturday = moment(value, "MM/DD/YYYY").day(6).format("YYYY-MM-DD");

    $("#weeklyDatePicker").val(sunday + " - " + saturday);
    $("#date_range").text("Week of : " + $("#weeklyDatePicker").val())
    $("#sunday").data("date", sunday);
    $("#monday").data("date", moment(value, "MM/DD/YYYY").day(1).format("YYYY-MM-DD"));
    $("#tuesday").data("date",moment(value, "MM/DD/YYYY").day(2).format("YYYY-MM-DD"));
    $("#wednesday").data("date",moment(value, "MM/DD/YYYY").day(3).format("YYYY-MM-DD"));
    $("#thursday").data("date", moment(value, "MM/DD/YYYY").day(4).format("YYYY-MM-DD"));
    $("#friday").data("date",moment(value, "MM/DD/YYYY").day(5).format("YYYY-MM-DD") );
    $("#saturday").data("date",saturday );
   
   
  });

//*********************************************************************************************************
// Registration Form Certificate Section
//********************************************************************************************************  
  $(".chosen-select").chosen({width: "100%"});
  $(".chosen-select").on("change", function(evt, params){  
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
                      $("#success_upload").show();
                      $("#uploading").hide();
                      $.each($('.existing_file'), function(i,element){
                        if ($(this).data("file-type") == response.type) {                     
                          $(this).find(".share_link").attr("href", response.file_share_link);
                          $(this).find(".file_info").data("file-id", response.id);
                          $(this).children().show();                          
                          $("#success_msg").text(response.type + " has been successfully sent to " + response.client_email + ".").show().delay(3000).fadeOut(1000);
                          $("#submit_button").show();
                        }
                      });                                     
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

// Email existing uploaded files to mutliple users
  $(".existing_file").on("click",function(){
    // add a data attribute indicates which existing_file is click
    $(this).data("clickable", "true")    
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
  
    $.each($('.existing_file'), function(i,element){
      if ($(this).data("clickable") == "true") {
        var attachment_id = $(this).find(".file_info").data("file-id")
          $.ajax({
            url:"/attachments/" + attachment_id,
            method:"put",
            dataType: "json",
            data:{attachment:{client_email:new_client_email}},
            success: function(response){
              if (response.id > 0) {
                $("#success_sent").show()
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
//======================================================================================================      
   



});


   
//============================Common ajax call for sending data ================================================

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


  function ajaxDeleteLabel(role_id){
    var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/users/"+ user_id,
      method: "delete",
      dataType:"json",
      data:{user:{roles_ids:[role_id]}},
      success: function(response){
      }

    });
  }

  function ajaxCreateLabel(role_id){
    var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/users/"+ user_id,
      method: "put",
      dataType:"json",
      data:{user:{roles_ids:[role_id]}},
      success: function(response){
        

      }
    });
  }
  
  function ajaxRoles(union_id, role_id, checkbox){
    var user_id = $("#info").data("user-id");
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
    var user_id = $("#info").data("user-id");
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
    var user_id = $("#info").data("user-id");
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
    })
   }



























