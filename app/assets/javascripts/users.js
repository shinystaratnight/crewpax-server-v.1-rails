$(function(){
  $("#user_role, #select_user_role").on("change",function(){
    var role_id= $(this).val();
      return window.location.href= (role_id) ? "/roles/" + role_id : "/users";
  });



  

});
  
  
