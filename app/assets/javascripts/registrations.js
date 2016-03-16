$(function(){

//*********************************************************************************************************
// Registration Form Personal Information Section 
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $("#name").on("blur", function(){
    //Retrieve the info from user's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a user is already created and decide which url the ajax should send to(create/update) 
    var user_id= $("#info").data("user-id");
    if(user_id== ""){
      var url = "/users";
      var method = "post";
    } 
    else {
      var url = "/users/" + user_id;
      var method ="put";
    }
    var name = $("#name").text().trim();
    // There are two rounds of validations, front-end and back-end. Here's the front-end validation
    if(name == ""){
      $(this).addClass("invalid");
      $(this).next().show();
      return false;
    }
    else{
      $("#name-error").hide();
      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{user: {name: name}},
        success: function(response){
          if(response.id){
            $("#info").data("user-id", response.id);
            $("#name").addClass("valid");
          }
          else{              
            var errors= response.toString();
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
    var phone=$("#phone").text().trim();
      if (phone ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
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
    var email=$("#email").text().trim();
    if (email ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
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
    
    if (address_id==""){
      var url ="/addresses";
      var method = "post";
    } else{
      var url ="/addresses/" + address_id;
      var method = "put";
    }
    
    var mailing_address=$("#mailing_address").text().trim();
    var type = "Mailing";
    var user_id = $("#info").data("user-id");
    
    if (mailing_address==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
        $("#mailing-address-error").hide();
        $.ajax({
          url:url, 
          method:method,
          dataType:"json",
          data:{address:{type:type, address_input:mailing_address, user_id:user_id}},
          success: function(response){
            if(response.id){
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
    if (address_id==""){
      var url ="/addresses";
      var method = "post";
    } else{
      var url ="/addresses/" + address_id;
      var method = "put";
    }
 
    var billing_address= $("#billing_address").text().trim();
    var type = "Billing";
    var user_id = $("#info").data("user-id");

    if (billing_address ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
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
    
    if (address_id==""){
      var url ="/addresses";
      var method = "post";
    } else{
      var url ="/addresses/" + address_id;
      var method = "put";
    }
    
    var shipping_address= $("#shipping_address").text().trim();
    var type = "Shipping";
    var user_id = $("#info").data("user-id");

    if (shipping_address ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
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
    var password= $(this).text().trim();
    if(password ==""){
      $(this).addClass("invalid");
      $("#password-error").show();
      return false;
    }
    else{
      $("#password").addClass("valid");
      $("#password-error").hide();
    }
  });    
      
    $("#password").pStrength({
      bind: 'keyup change',
      changeBackground: false,
      onPasswordStrengthChanged: function(passwordStrength, strengthPercentage) {
        if($(this).text()){
          $.fn.pStrength('changeBackground',$(this), passwordStrength);
        } 
        else {
          $.fn.pStrength('resetStyle', $(this));
        }
      }
    });
    
 


//===================================================================================
  $("#pw_confirmation").on("blur", function(){
    var password_confirmation=$(this).text().trim();
    var password = $("#password").text().trim();
    var user_id = $("#info").data("user-id");

    if(password_confirmation ==""){
      $(this).addClass("invalid");
      $("#pw-confirmation-error").show();
      return false;
    }
    else if(password==password_confirmation){
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
    }
    else{
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
      } 
      else {
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

// Data for membership or permit 
  $("#dgc_permit, #dgc_member").on("click", function(){
    var status = $(this).data("name");
    var union_id = $("#DGC").data("union-id");
    if (status=="member"){
      var data=$("#dgc_member").val();
      console.log("membershipe T/F:", data)
      union_member_checkbox_checked(status, union_id,data);
     }else{
      $("#dgc_number_days, #permit_days").show();
      $("#permit_days").on("blur", function(){
        var data = $("#permit_days").text().trim();
        console.log("dgc permit status:", data) 
      });
        union_permit_checkbox_checked(status,union_id, data);

     }
  });
//===========================For IATSE========================================================
  $("#IATSE").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
   
  }); 

  $("#iatse_permit, #iatse_member").on("click", function(){
    var status = $(this).data("name");
    var union_id = $("#IATSE").data("union-id");
    if(status=="member"){
      var data=$("#iatse_member").val();
      console.log("membershipe T/F:", data)
      union_member_checkbox_checked(status, union_id, data);
    }else{
      $("#iatse_number_days, #iatse_permit_days").show();
      $("#iatse_permit_days").on("blur", function(){
        var data=$("#iatse_permit_days").text().trim();
        console.log("iatse permit status", data )
      });
      union_permit_checkbox_checked(status,union_id, data);
    }


  });

//=================================For ACFC ============================================================== 
  $("#ACFC").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
    
  });
  
  $(".ACFC_roles").on("click", function(){
    var union_id = $("#ACFC").data("union-id");
    var role_id= $(this).prev().text();
    $(this).data("role-id", role_id);
    if($(this).is(":checked")){
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    }else {
      var eligibility_id=$(this).data("eligibility-id");

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
    var role_id= $(this).prev().text();
    $(this).data("role-id", role_id);
      if($(this).is(":checked")){
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    }else {
      var eligibility_id=$(this).data("eligibility-id");

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
    var role_id= $(this).prev().text();
    $(this).data("role-id", role_id);
    if($(this).is(":checked")){
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    }else {
      var eligibility_id=$(this).data("eligibility-id");
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
    var role_id= $(this).prev().text();
    $(this).data("role-id", role_id);
    if($(this).is(":checked")){
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    }else {
      var eligibility_id=$(this).data("eligibility-id");
      ajaxDeleteLabel(role_id);
      ajaxDeleteEligibility(union_id, role_id, eligibility_id)
    }
  });



//==================================For Non Union =====================================================================
  $("#NON_UNION").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
    console.log("non union union id:", $(this).data("union-id"))
  });

  $(".NON_UNION_roles").on("click", function(){
    var union_id = $("#NON_UNION").data("union-id");
    var role_id= $(this).prev().text();
    $(this).data("role-id", role_id);
    if($(this).is(":checked")){
      ajaxRoles(union_id, role_id, $(this));
      ajaxCreateLabel(role_id);
    }else {
      var eligibility_id=$(this).data("eligibility-id");
      ajaxDeleteLabel(role_id);
      ajaxDeleteEligibility(union_id, role_id, eligibility_id)
    }
  });













      
   
   
  });


//============================Common ajax call for sending data ================================================
  function union_member_checkbox_checked(status, union_id,data){
    console.log("status, union_id,data:", status, union_id,data)
      $(".roles").on("click", function(){  
        var role_id= $(this).prev().text();
        $(this).data("role-id", role_id);
        if ($(this).is(":checked")){
          ajaxMember(data, union_id, role_id, $(this)); 
          ajaxCreateLabel(role_id);  
        }
        else{  
          var eligibility_id=$(this).data("eligibility-id");
          ajaxDeleteEligibility(union_id, role_id,eligibility_id);
          ajaxDeleteLabel(role_id);
        }    
      });    
  }

  function union_permit_checkbox_checked(status,union_id, data){
    console.log("status, union_id,data:", status, union_id,data)
      $(".roles").on("click", function(){  
        var role_id= $(this).prev().text();
        $(this).data("role-id", role_id);
        if ($(this).is(":checked")){
          ajaxPermit(data, union_id, role_id, $(this)); 
          ajaxCreateLabel(role_id);  
        }
        else{  
          var eligibility_id=$(this).data("eligibility-id");
          ajaxDeleteEligibility(union_id, role_id,eligibility_id);
          ajaxDeleteLabel(role_id)
        }    
      });  

  }

  function ajaxDeleteEligibility(union_id, role_id,eligibility_id){
    var user_id= $("#info").data("user-id");
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
    var user_id= $("#info").data("user-id");
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
    var user_id= $("#info").data("user-id");
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
    var user_id= $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities",
      method: "post",
      dataType: "json",
      data:{eligibility:{union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){
        checkbox.data("eligibility-id",response.id);
        console.log("checked eligibility row id:", checkbox.data("eligibility-id")) 
      }
    });
  }


  function ajaxMember(data, union_id, role_id, checkbox){
    var user_id= $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities", 
      method:"post",
      dataType:"json",
      data:{eligibility:{member:data, union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){
        checkbox.data("eligibility-id",response.id);
        console.log("checked eligibility row id:", checkbox.data("eligibility-id"))      
      }          
    });
  }

  function ajaxPermit(data, union_id, role_id, checkbox){
    var user_id= $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities",
      method: "post",
      dataType:"json",
      data: {eligibility:{permit_days: data, union_id: union_id, user_id:user_id}},
      success: function(response){
        checkbox.data("eligibility-id",response.id);
        console.log("checked eligibility row id:", checkbox.data("eligibility-id"))
        
      }
    });
  }
 



























