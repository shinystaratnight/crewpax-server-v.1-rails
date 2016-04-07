$(function(){
  $("#job_role").on("change",function(){
    var role_id = $(this).val();
      return window.location.href = (role_id) ? "/roles/" + role_id : "/jobs";
  });
});