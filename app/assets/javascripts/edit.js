//*********************************************************************************************************
// Edit Form 
//********************************************************************************************************  
$(function(){

// //======================== Personal Info Section ===================================================================
//===================================================================================

  





//*********************************************************************************************************
// Edit Form Department Section
//********************************************************************************************************  
//==================Group One DGC ============================================================================================= 
// Data attributes for union-id 
  $("#DGC").on("click", function(){
    var union_id = $(this).prev().text();
    $(this).data("union-id", union_id);
   
  }); 
  
  $("#dgc_permit").on("click", function(){
    if ($(this).is(":checked")) {
      $("#dgc_number_days, #permit_days").show();
      $("#permit_days").on("blur", function(){
        var data = $("#permit_days").text().trim();
        $("#dgc_permit").val(data);
      });
    } else {
      $("#dgc_number_days, #permit_days").hide();
    }
  });

  $(".roles").on("click",function(){
    if ($("#dgc_member").is(":checked")) {
      var data = $("#dgc_member").val();
      var union_id = $("#DGC").data("union-id");
      var role_id = $(this).prev().text();
      $(this).data("role-id", role_id);
      if ($(this).is(":checked")) {
        ajaxMember(data, union_id, role_id, $(this)); 
        ajaxCreateLabel(role_id);  
      } else {  
        var eligibility_id = $(this).data("eligibility-id");
        ajaxDeleteEligibility(union_id, role_id,eligibility_id);
        ajaxDeleteLabel(role_id);
      }    
    } 
    else if ($("#dgc_permit").is(":checked")) {
      var data = $("#dgc_permit").val()
      var union_id = $("#DGC").data("union-id");
      var role_id = $(this).prev().text();
      $(this).data("role-id", role_id);
      if ($(this).is(":checked")) {
        ajaxPermit(data, union_id, role_id, $(this)); 
        ajaxCreateLabel(role_id);  
      } else {  
        var eligibility_id = $(this).data("eligibility-id");
        ajaxDeleteEligibility(union_id, role_id,eligibility_id);
        ajaxDeleteLabel(role_id)
      } 
    } else {
      alert("You must indicate whether you are a member or you have a permit")
    }

      
  });












    
})