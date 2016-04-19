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
// Edit Form Files Upload Section 
//********************************************************************************************************  
 $("#new_file_upload_form").on("submit", function(event){  
    var client_email = $("#recipient_email").val().trim(); 
    var user_id = $("#info").data("user-id");
    var file_type = $("#selected_file :selected").val()
    var formData = new FormData();
    $input = $("#upload_file");
  
    if ($input[0].files.length == 0) {
      $("#fail_msg").text("Attachment can't be blank, please choose your file").show().delay(3000).fadeOut(1000)
      return false;      
    }
    else if (client_email == "") {
      $("#fail_msg").text("Recipient email can't be blank").show().delay(3000).fadeOut(1000)
      return false;
    } else {    
      var file_name = $input[0].files[0].name
      var name = user_id + "_" + file_type + "_" + file_name;
      formData.append("attachment[file]", $input[0].files[0]);   
      $("#fail_msg").hide();
      event.preventDefault();
      $("#submit_button").hide();
      $("#uploading").show();       
        $.ajax({
          url:"/attachments",
          method: "post",
          dataType: "json",    
          data:{attachment:{user_id:user_id, type:file_type, name: name,file: "null", client_email:client_email}},
          success: function(response){
            $("#selected_file :selected").data("attachment-id",response.id)
            var attachment_id = $("#selected_file :selected").data("attachment-id");
              if (response.id > 0) {
                $.ajax({
                  url:"/attachments/" + attachment_id,
                  method: "put",
                  dataType: "json",
                  data:formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  success: function(response){
                    if (response.file_share_link === undefined) {
                      $("#fail_msg").text(response).show().delay(3000).fadeOut(1000)
                      $("#uploading").hide();
                      $("#submit_button").show();
                    } else {
                      $("#success_upload").show();
                      $("#uploading").hide();
                      $.each($('.uploaded_file'), function(i,element){
                          debugger
                        if ($(this).data("file-type") == response.type) {   
                          $(this).parent().show()                  
                          $(this).find(".share_link").attr("href", response.file_share_link);
                          $(this).find(".file_info").data("file-id", response.id)
                          debugger
                          var icon = $(this).children()[2]
                          $(icon).children().data("attachment-id", response.id)
                                   
                          $("#success_msg").text(response.type + " has been successfully sent to " + response.client_email + ".").show().delay(3000).fadeOut(1000);
                          $("#submit_button").show();
                          console.log("response id:", response.id)
                          console.log("data attribute file id:", $(this).find(".file_info").data("file-id"))
                          console.log("icon attachment id:", $(icon).children().data("attachment-id"))
                        }
                      });                                     
                    }
                  }               
                });
              } else {
                $("#fail_msg").text(response).show().delay(3000).fadeOut(1000)
                $("#uploading").hide();
                $("#submit_button").show();
              }
            }

        });
    }
    
  }); 









//========================== Delete already uploaded files==========================================

  $(".resume_delete").on("click", function(){
    $("#edit_resume").hide();
    $("#resume_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteDocument(attachment_id,$("#resume_deleting"), $("#resume_delete_completed"), $("#resume_info"), $("#resume_delete"))
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
    ajaxDeleteDocument(attachment_id, $("#other_deleting"), $("#other_delete_completed"))
  })

//=============================================================================================




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

  function ajaxDeleteDocument(attachment_id, processing, completion, docs, icon){  
    var user_id = $("#info").data("user-id");   
    $.ajax({
      url:"/attachments/"+ attachment_id,
      method:"delete",
      dataType: "json",
      data:{attachment: {id: attachment_id, user_id: user_id}},
      success: function(response){
        debugger
        if(response === undefined){
          $(docs).data("file-id", "")
          $(icon).data("attachment-id", "")
          $(processing).hide();
          $(completion).show().delay(3000).fadeOut(1000);

        }
      }
    });
  }