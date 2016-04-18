//*********************************************************************************************************
// Edit Form 
//********************************************************************************************************  
$(function(){

//*********************************************************************************************************
// Edit Form Certificates Section
//********************************************************************************************************  
//=================== ============================================================================================= 
  $(".chosen-select").chosen({width: "100%"});
  var selection = $(".chosen-select").find("option:selected")
  $("#edit-certificate").on("change", function(evt, params){     
    var selected = params.selected
    var deselected = params.deselected 
      if (selected >0 ) {
        ajaxEditAddCertifiable(selected)  
      } else if (deselected > 0) {
        $.map($(selection), function(option){
          if($(option).val() == deselected) {
            var certifiable_id = $(option).data("certifiable-id")
            ajaxEditDeleteCertifiable(deselected,certifiable_id)
          }        
        });
      }
  });

//===================================================================================






});

//===============================Common method===========================

  function ajaxEditAddCertifiable(selected_certificate){
    var user_id = $("#info").data("user-id");
    $.ajax({
      url:"/certifiables",
      method: "post",
      dataType: "json",
      data:{certifiable:{user_id: user_id, certificate_id: selected_certificate}},
      success: function(response){    
        
      }
    });

   }

  function ajaxEditDeleteCertifiable(deselected, certifiable_id){
    var user_id = $("#info").data("user-id");    
    $.ajax({
      url:"/certifiables/"+ certifiable_id,
      method: "delete",
      dataType: "json",
      data:{certifiable:{user_id: user_id, id: certifiable_id, certificate_id:deselected}},
      success: function(response){
        
      }
    });
  }