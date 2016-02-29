$(function(){
  //When a mouse leaves the entry div, it will trigger ajax
  $("#name").blur(function(){
  // Retrieve the info from user's entries and turn
  // data into a nicely structured object (nesting included!)
    var name = $("#name").text();
      $.ajax({
        url: "/users",
        method:"post",
        dataType: "json",
        data:{name: name},
        success: 
        console.log("data is successfully saved")
        
      });
  });

  $("#phone").blur(function(){
   
    var phone=$("#phone").text();
      $.ajax({
        url:"/users" ,
        method:"post",
        dataType:"json",
        data:{phone :phone}
      })
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
