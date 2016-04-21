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
                      $("#success_upload").show().delay(3000).fadeOut(1000);
                      $("#uploading").hide();
                      $("#submit_button").show();
                      // for multiple files upload under the same type
                        var $docs_upload = $("#document_template").clone();                       
                        $docs_upload.find("#document_info").data("file-id", response.id);
                        $docs_upload.find("#document_name").text(response.type)                        
                        $docs_upload.find(".ajax_document_delete").data("attachment-id", response.id);
                        $docs_upload.find(".document_share_link").attr("href", response.file_share_link);
                        $("#new_uploaded_file").append($docs_upload.show());
                        $("#success_msg").text(response.type + " " +"has been sent to" + " " +response.client_email + ".").show().delay(3000).fadeOut(1000);
                        console.log("resume delete attachment-id:", $docs_upload.find(".ajax_document_delete").data("attachment-id") )
                        console.log("resume info file id:", $docs_upload.find("#document_info").data("file-id"))                              
                     
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

//======================delete files that were uploaded from edit view page=======================================================================
  $("#new_uploaded_file").on("click", ".ajax_document_delete",function(){
   
    $(this).parentsUntil("#document_template").hide()
    $("#ajax_document_deleting").show(); 
    var attachment_id = $(this).data("attachment-id")
    console.log("attachment id:", attachment_id)
    debugger
    ajaxDeleteNewDocument(attachment_id, $("#ajax_document_deleting"), $(this))
  });





//========================== Delete already uploaded files(Data are rendered from server when page is refreshed)==========================================

  $(".resume_delete").on("click", function(){
    $(this).parents("span").hide()
    $("#resume_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteNewDocument(attachment_id,$("#resume_deleting"),$(this))
  });

  $(".noa_delete").on("click", function(){ 
    $(this).parents("span").hide()
    $("#noa_deleting").show();
    var attachment_id = $(this).children().data("attachment-id");
    ajaxDeleteNewDocument(attachment_id,$("#noa_deleting"),$(this))
  });

  $(".driver_delete").on("click", function(){
    $(this).parents("span").hide()
    $("#driver_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteNewDocument(attachment_id, $("#driver_deleting"), $(this))
  })

  $(".other_delete").on("click", function(){
    $(this).parents("span").hide()
    $("#other_deleting").show();
    var attachment_id = $(this).children().data("attachment-id") 
    ajaxDeleteNewDocument(attachment_id, $("#other_deleting"),$(this))
  })

//=============email existing uploaded files to mutliple users==================================================================

  $(".uploaded_file").on("click",function(){
    // for sending multiple emails for the same files. Scenerio one a user clicks a file, and send multiple emails.
    //First reset every data-clickable attribute to none

    $.each($('.uploaded_file'), function(i,element){
      $(element).data("clickable", "")
      $(this).find(".file_info").removeClass("selected_document");
      $(this).find(".file_info").find("i").css({"color": "black"})
    });

    // add a data attribute indicates which existing_file is click
    $(this).data("clickable", "true")
 
    // Use color to indicate which file is selected by the user       
    labelSeletedDocument($('.uploaded_file'))
    
  
    
  });


  $("#new_uploaded_file").on("click",".uploaded_file",function(){
    // for sending multiple emails for the same files. Scenerio one a user clicks a file, and send multiple emails.
    //First reset every data-clickable attribute to none
    resetDocumentDataAttr($("#new_uploaded_file .uploaded_file"))
    resetDocumentDataAttr($('.uploaded_file'))      
    // add a data attribute indicates which existing_file is click
    $(this).data("clickable", "true")
    // Use color to indicate which file is selected by the user   
    labelSeletedDocument($(this))    
      
  });

  $("#email_new_form").on("submit", function(event){
    var new_client_email = $("#new_client_email").val().trim();
    if (new_client_email == "") {
      $("#fail_new_client_msg").text("Recipient email can't be blank").show().delay(3000).fadeOut(1000);
      return false;
    }
    event.preventDefault();
    $("#email_sent").hide();
    $("#sending").show();

    $.each($('.uploaded_file'), function(i,element){
      if ($(this).data("clickable") == "true") {
        var attachment_id = $(this).find(".file_info").data("file-id")
        var file = $(this)
          $.ajax({
            url:"/attachments/" + attachment_id,
            method:"put",
            dataType: "json",
            data:{attachment:{client_email:new_client_email}},
            success: function(response){
              if (response.id > 0) {
                $("#email_sent").show();
                $("#sending").hide();
                $("#success_new_client_msg").text(response.type + " has been successfully sent to " + response.client_email + ".").show().delay(3000).fadeOut(1000);
              } else {
                $("#fail_new_client_msg").text(response).show().delay(3000).fadeOut(1000)
                $("#sending").hide();
                $("#email_sent").show();
              }
            }

          });
      }

    });
  
   
  });










//=======================================================================================================




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


  function ajaxDeleteNewDocument(attachment_id, processing, docs){
    var user_id = $("#info").data("user-id");   
    debugger
    $.ajax({
      url:"/attachments/"+ attachment_id,
      method:"delete",
      dataType: "json",
      data:{attachment: {id: attachment_id, user_id: user_id}},
      success: function(response){
        if(response === undefined){
          $(processing).hide();
          $("#success_msg").text("File has been successfully deleted.").show().delay(3000).fadeOut(1000);
          $(this).parents("span").remove();         
          
        }
      }
    });
  }

  function resetDocumentDataAttr(user_documents){
      $.each($(user_documents), function(i,element){
        $(element).data("clickable", "")
        $(this).find(".file_info").removeClass("selected_document");
        $(this).find(".file_info").find("i").css({"color": "black"})
    });

  }

  function labelSeletedDocument(user_docs){
    $.each($(user_docs), function(i,element){
      if($(element).data("clickable")=="true"){
        $(this).find(".file_info").find("i").css({"color": "#5cb85c"})
        $(this).find(".file_info").addClass("selected_document")
      }
    });
  }