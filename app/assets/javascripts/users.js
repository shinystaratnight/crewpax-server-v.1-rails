$(function(){
  $("#user_role").change(function(){
    var role_id;
      role_id = $(this).val();
        if (role_id) {
          return window.location.href = "/roles/" + role_id;
        } else {
          return window.location.href = "/users";
        };
  });

   $("#select_user_role").change(function(){
    var role_id;
      role_id = $(this).val();
        if (role_id) {
          return window.location.href = "/roles/" + role_id;
        } else {
          return window.location.href = "/users";
        };
  });


});
  
  
