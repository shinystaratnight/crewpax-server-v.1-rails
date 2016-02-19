$(function(){
  $("#user_category").change(function(){
    var category_id;
      category_id = $(this).val();
        if (category_id) {
          return window.location.href = "/categories/" + category_id;
        } else {
          return window.location.href = "/users";
        };
  });

});
  
  
