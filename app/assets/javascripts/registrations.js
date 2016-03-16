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
//==================Group One DGC and Group Two IATSE (member/ permit)================================================================================ 
  // $("#DGC, #IATSE").on("click",function(){
  //   var union_name =$(this).data("union-name"); 
  //   $.ajax({
  //     url:"/unions",
  //     method: "get",
  //     dataType: "json",
  //     data:{union:{name: union_name}},
  //     success: function(response){
  //       if (response.name== "DGC"){
  //         $("#DGC").data("union-id", response.id);
  //         console.log("selected union's id ", $("#DGC").data("union-id"))
  //       } else{
  //         $("#IATSE").data("union-id", response.id);
  //         console.log("selected union's id ", $("#IATSE").data("union-id"))
  //       }        
  //     }
  //   });
   
  // });

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
      union_checkbox_checked(status, union_id, data);
     }else{
      $("#dgc_number_days, #permit_days").show();
      $("#permit_days").on("blur", function(){
        var data = $("#permit_days").text().trim();
        console.log("dgc permit status:", data) 
      });
        union_checkbox_checked(status, union_id, data)

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
      union_checkbox_checked(status, union_id, data);
    }else{
      $("#iatse_number_days, #iatse_permit_days").show();
      $("#iatse_permit_days").on("blur", function(){
        var data=$("#iatse_permit_days").text().trim();
        console.log("iatse permit status", data )
      });
      union_checkbox_checked(status, union_id, data);
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
    ajaxRoles(union_id, role_id);
    ajaxCreateLabel(role_id);
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
    console.log("union id:", union_id, "role id:", role_id)
    ajaxRoles(union_id, role_id);
    ajaxCreateLabel(role_id);
  });


























  //     console.log("dgc pa role id:", $("#DGC_PA").data("role-id"),
  //      "dgc key pa:", $("#DGC_Key_PA").data("role-id"),
  //      "dgc on set key:",$("#DGC_On_Set_Key").data("role-id"),
  //      "dgc opa :",$("#DGC_OPA").data("role-id"),
  //      "dgc transport:", $("#DGC_Transport").data("role-id"),
  //      "dgc tal:", $("#DGC_TAL").data("role-id"),
  //      "dgc alm:", $("#DGC_ALM").data("role-id"),
  //      "dgc lm:", $("#DGC_LM").data("role-id"),
  //      "dgc TAD:", $("#DGC_TAD").data("role-id"),
  //      "dgc 3rd AD:",  $("#DGC_3RD_AD").data("role-id"),
  //      "dgc 2nd AD:", $("#DGC_2ND_AD").data("role-id"),
  //      "dgc 1st AD:", $("#DGC_1ST_AD").data("role-id"))
      

      
   
   
  });

  // $("#iatseStatus").on("change", function(){
  //   var status=$(this).children("input:checked").data("name");
  //   var union_id =$("#IATSE").data("union-id");
  //   var union_section =$("#IATSE");
  //   if (status=="member"){
  //     var data = $(this).children("input:checked").val();
  //     ajaxMember(data,union_id,union_section);
  //   }else{
  //     $("#iatse_number_days, #iatse_permit_days").show();
  //     $("#iatse_permit_days").on("blur", function(){
  //       var data = $("#iatse_permit_days").text().trim();
  //       ajaxPermit(data,union_id,union_section);

  //     });      
  //   }
  // });

//============================Common ajax call for sending data ================================================
  function union_checkbox_checked(status, union_id,data){
    console.log("status, union_id,data:", status, union_id,data)
      $(".roles").on("click", function(){  
        var role_id= $(this).prev().text();
        $(this).data("role-id", role_id);
        ajaxMember(data, union_id, role_id); 
        ajaxCreateLabel(role_id);      
      });    
  }

  function union_checkbox_roles(union_id){
    $(".roles").on("click", function(){
      var role_id= $(this).prev().text();
      $(this).data("role-id", role_id);
      console.log("union_id:", union_id, "role_id", role_id)
      ajaxRoles(union_id, role_id);
      ajaxCreateLabel(role_id);
    })
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
  
  function ajaxRoles(union_id, role_id){
    var user_id= $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities",
      method: "post",
      dataType: "json",
      data:{eligibility:{union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){

      }
    });
  }


  function ajaxMember(data, union_id, role_id){
    var user_id= $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities", 
      method:"post",
      dataType:"json",
      data:{eligibility:{member:data, union_id: union_id, user_id: user_id, role_id: role_id}},
      success: function(response){
                
      }          
    });
  }

  function ajaxPermit(data, union_id, user_id){
    var user_id= $("#info").data("user-id");
    $.ajax({
      url:"/eligibilities",
      method: "post",
      dataType:"json",
      data: {eligibility:{permit_days: data, union_id: union_id, user_id:user_id}},
      success: function(response){

      }
    });
  }
 



























