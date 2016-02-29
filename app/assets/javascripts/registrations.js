$(function(){

  //When a mouse leaves the entry div, it will trigger ajax
  $("#name").on("blur", function(){
  //Retrieve the info from user's entries and turn data into a nicely structured object (nesting included!)
  //Check to see if a user is already created and decide which url the ajax should send to(create/update) 
    var user_id= $(this).parent().data("user-id");
    
    if(user_id== ""){
      var url = "/users";
    } 
    else {
      var url = "/users" + user_id;
    }

    var name = $("#name").text();
  // There are two rounds of validations, front-end and back-end. Here's the front-end validation
    // debugger
    if(name == ""){
      alert("name cannot be blank");
      $(this).addClass("invalid");
      $(this).next().show();
      return false;
      
    }else{
      $("#name-error").hide();
      $(this).addClass("valid");
      $.ajax({
        url: url,
        method:"post",
        dataType: "json",
        data:{name: name},
        success: function(res){
          console.log("name is successfully saved")
          }
        });
        return false;
    }
     
      
   

     
    

     
  });

  $("#phone").blur(function(){
    
    var phone=$("#phone").text();
      $.ajax({
        url:"/users", //+ current_use_id
        method:"put",
        dataType:"json",
        data:{phone :phone},
        success: 
         console.log("phone is successfully saved")
      });
  });

  $("#email").blur(function(){
    var email=$("#email").text();
  });

  $("#mailing_address").blur(function(){
    var mailing_address=$("#mailing_address").text();
  });

  $("#billing_address").blur(function(){
    var billing_address= $("#billing_address").text();
  });

  $("#shipping_address").blur(function(){
    var shipping_address= $("#shipping_address").text();
  });

});
