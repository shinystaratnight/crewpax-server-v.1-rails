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
//*********************************************************************************************************
// Edit Form Files Upload Section - Delete already uploaded files
//********************************************************************************************************  
  $(".resume_delete").on("click", function(){
    $("#edit_resume").hide();
    $("#resume_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteDocument(attachment_id,$("#resume_deleting"), $("#resume_delete_completed"))
  });

  $(".noa_delete").on("click", function(){  
    $("#edit_noa").hide();
    $("#noa_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteDocument(attachment_id,$("#noa_deleting"),$("#noa_delete_completed"))
  });

  $(".driver_delete").on("click", function(){
    $("#edit_driver").hide();
    $("#driver_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteDocument(attachment_id, $("#driver_deleting"), $("#driver_delete_completed"))
  })

  $(".other_delete").on("click", function(){
    $("#edit_other").hide();
    $("#other_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    console.log("attachment_id:", attachment_id)
    ajaxDeleteDocument(attachment_id, $("#other_deleting"), $("#other_delete_completed"))
  })






});

//===============================Common method========================================================

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

  function ajaxDeleteDocument(attachment_id, processing, completion){    
    $.ajax({
      url:"/attachments/"+ attachment_id,
      method:"delete",
      dataType: "json",
      data:{attachment: {id: attachment_id}},
      success: function(response){
        if(response === undefined){
          $(processing).hide();
          $(completion).show().delay(3000).fadeOut(1000);
        }
      }
    });
  }