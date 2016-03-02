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
      $(this).addClass("valid");
      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{user: {name: name}},
        success: function(response){
          if(response.id){
            $("#info").attr("data-user-id", response.id)
          }
          else{
            
            $("#name-error").show();
          }
        }
      });
    };
      return false;
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
        $(this).addClass("valid");  
        $.ajax({
          url:"/users/" + user_id, 
          method:"put",
          dataType:"json",
          data:{user:{phone: phone}},
          // success: function(response){
          // console.log("phone is successfully saved")
          // }
          error: function(response){
            alert(response.error);
          }
        });
      }
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
    debugger
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


























});
