$(function(){
  $("#user_category").change(function(){
    var category_id;
    category_id = $(this).val();
    return window.location.href = "/categories/"+category_id;
  });

});
  
  
