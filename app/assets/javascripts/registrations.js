$(function(){
//When a mouse leaves the entry div, it will trigger ajax
  $("#name").on("blur", function(){
    //Retrieve the info from user's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a user is already created and decide which url the ajax should send to(create/update) 
    var user_id= $(this).parent().attr("data-user-id");
    if(user_id== ""){
      var url = "/users";
      var method = "post";
    } 
    else {
      var url = "/users/" + user_id;
      var method ="put";
    }
    var name = $("#name").text();
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
            $("#info").attr("data-user-id", response.id)
            $("#name").addClass("valid");
          }
          else{              
            var errors= response.toString();
            $("#name-error").html("*"+ errors);
            $("#name").addClass("invalid");
            $("#name-error").show();
           
          }
        }
      });
    };
      // return false;
  });

//=====================================================================================
  $("#phone").on("blur", function(){
    var user_id = $("#info").attr("data-user-id");
    var phone=$("#phone").text();
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
            $(this).addClass("valid"); 
            // if (response.error){
            //   debugger
            //   var errors= response.toString();
            //   $("#phone-error").html("*"+ errors);
            // }
            
          console.log("phone is successfully saved")
          },

          error: function(xhr){  
            console.log("It's not valid, xhr:", xhr);
            var errors = $.parseJSON(xhr.responseText).toString();
            console.log("errors:", errors);
            $("#phone").addClass("invalid");
            $("#phone-error").html("*"+ errors);
            $("#phone-error").show();
          }
  
        });
      };
  });


//============================================================================================
  $("#email").on("blur", function(){
    var user_id = $("#info").attr("data-user-id");
    var email=$("#email").text();
    if (email ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
        $("#email-error").hide();
        $(this).addClass("valid");  
        $.ajax({
          url:"/users/" + user_id, 
          method:"put",
          dataType:"json",
          data:{user:{email: email}},
          success: function(response){

          console.log("email is successfully saved")
          }
        });
      }
  });



//============================================================================================
  $("#mailing_address").on("blur", function(){
    // Need to check if the address.id exists, if yes -> post, no-> put
    var address_id = $("#mailing_address_info").attr("data-address-id");
    
    if (address_id==""){
      var url ="/addresses";
      var method = "post";
    } else{
      var url ="/addresses/" + address_id;
      var method = "put";
    }
    
    var mailing_address=$("#mailing_address").text();
    var type = "Mailing";
    var user_id = $("#info").attr("data-user-id");

    if (mailing_address ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
        $("#mailing-address-error").hide();
        $(this).addClass("valid");  
        $.ajax({
          url:url, 
          method:method,
          dataType:"json",
          data:{address:{type:type, address_input:mailing_address, user_id:user_id}},
          success: function(response){
            if(response.id){
              $("#mailing_address_info").attr("data-address-id", response.id)
            }
          console.log("mailing address is successfully saved")
          }
        });
      }
  });
//============================================================================================

  $("#billing_address").on("blur", function(){
    
    // Need to check if the address.id exists, if yes -> post, no-> put
    var address_id = $("#billing_address_info").attr("data-billing-id");
    if (address_id==""){
      var url ="/addresses";
      var method = "post";
    } else{
      var url ="/addresses/" + address_id;
      var method = "put";
    }
 
    var billing_address= $("#billing_address").text();
    var type = "Billing";
    var user_id = $("#info").attr("data-user-id");

    if (billing_address ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
        $("#billing-address-error").hide();
        $(this).addClass("valid");  
        $.ajax({
          url:url, 
          method:method,
          dataType:"json",
          data:{address:{type:type, address_input:billing_address, user_id:user_id}},
          success: function(response){
            if(response.id){
              $("#billing_address_info").attr("data-billing-id", response.id)
            }
          console.log("Billing address is successfully saved")
          }
        });
      }

  });
//============================================================================================

  $("#shipping_address").on("blur", function(){
    // Need to check if the address.id exists, if yes -> post, no-> put
    var address_id = $("#shipping_address_info").attr("data-shipping-id");
    
    if (address_id==""){
      var url ="/addresses";
      var method = "post";
    } else{
      var url ="/addresses/" + address_id;
      var method = "put";
    }
    
    var shipping_address= $("#shipping_address").text();
    var type = "Shipping";
    var user_id = $("#info").attr("data-user-id");

    if (shipping_address ==""){
        $(this).addClass("invalid");
        $(this).next().show();
        return false;
      } 
      else {
        $("#shipping-address-error").hide();
        $(this).addClass("valid");  
        $.ajax({
          url:url, 
          method:method,
          dataType:"json",
          data:{address:{type:type, address_input:shipping_address, user_id:user_id}},
          success: function(response){
            if(response.id){
              $("#shipping_address_info").attr("data-shipping-id", response.id)
            }
          console.log("Shipping address is successfully saved")
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
      var condition = state;
      var user_id = $("#info").attr("data-user-id");
      console.log("condition, user_id", condition, user_id);
      $.ajax({
        url:"/users/"+ user_id,
        method: "put",
        dataType: "json",
        data: {user: {has_traffic_control_ticket: condition}},
        success: function(response) {
          console.log("traffic control info is updated")
        }
      });
    });
//===================================================================================
  $('#vehicle').on('switchChange.bootstrapSwitch', 
    function(event, state) {
      
      var condition = state;
      var user_id = $("#info").attr("data-user-id");
      console.log("condition, user_id", condition, user_id);
      $.ajax({
        url:"/users/"+ user_id,
        method: "put",
        dataType: "json",
        data: {user: {has_vehicle: condition}},
        success: function(response) {
          console.log("Vehicle info is updated")
        }
      });
    });
//===================================================================================
  $("#upload_picture").on("change", function(){
    var formData = new FormData();
    var user_id = $("#info").attr("data-user-id");

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
        alert("success");
      }
    });    
  });




//===================================================================================
  $("#password").on("blur", function(){
    var password= $(this).text();
    if(password ==""){
      $(this).addClass("invalid");
      $(this).next().show();
      return false;
    }
    else{
      $(this).addClass("valid");
      $(this).next().hide();
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
    var password_confirmation=$(this).text();
    var password = $("#password").text();
    var user_id = $("#info").attr("data-user-id");

    if(password_confirmation ==""){
      $(this).addClass("invalid");
      $(this).next().show();
      return false;
    }
    else if(password==password_confirmation){
      $("#password-error").hide();
        $("#pw_confirmation").addClass("valid");  
        $.ajax({
          url:"/users/" + user_id, 
          method:"put",
          dataType:"json",
          data:{user:{password: password_confirmation}},
          success: function(response){

          console.log("password is successfully saved")
            }
        });
    }
    else{
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
        $('#pw_confirmation_strength_precentage').html('Your password strength is ' + strengthPercentage + '%.')    
      },
    onValidatePassword: function(strengthPercentage){
      $('#pw_confirmation_strength_precentage').html(
      $('#pw_confirmation_strength_precentage').html() + ' Great, now you can continue to register!'

      );
    }
  });


});























