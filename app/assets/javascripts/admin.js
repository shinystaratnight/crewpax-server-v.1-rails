$(function(){

//*********************************************************************************************************
// Add, Update or Delete Union Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".union-name").on("blur", function(){
    //Check to see if a union is already created and decide which url the ajax should send to(create/update) 
    var text_box = $(this);
    var union_id = text_box.closest(".union-info").data("union-id");
    if (union_id == "") {
      var url = "admin/unions";
      var method = "post";
    } else {
      var url = "admin/unions/" + union_id;
      var method = "put";
    }
    var name = text_box.closest(".union-name").text().trim();

    if (name == "") {
      text_box.addClass("invalid").next().show();
      return false;
    } else {
      $(".union-name-error").hide();
      text_box.addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{union: {name: name}},
        success: function(response){
          if (response.id) {
            text_box
              .closest(".union-info").data("union-id", response.id)
              .next(".union-info").data("union-id", response.id)
              .next(".union-info").children("#save-new-union").data("union-id", response.id);
            //cancel button stores data union id
            text_box.closest(".union-info")
                    .next(".union-info")
                    .next(".union-info")
                    .next(".union-info").children(".cancel-button").data("union-id", response.id); 
            $("#newUnion").data("name", response.name);
            $("#new-union-roles").show();

          } else {              
            var errors = response.toString();
            $(".union-name-error").text("*"+ errors).show();
            $(".union-name").addClass("invalid");   
          }
        }
      });
    }
  });


//update new unions whether they have member status or permit status
  $("#has_member, #has_permit, #edit_has_member, #edit_has_permit").on("click", function(){
    if ($(this).is(":checked")){ 
      var union_status_value = $(this).val();     
      updateUnionStatus($(this), union_status_value)
    }else{
      var union_status_value = "false"
      updateUnionStatus($(this), union_status_value)
      
    }
  })

  function updateUnionStatus(checkbox, union_status_value){
    var union_id = $(checkbox).closest(".union-info").data("union-id")
    var data;
    if($(checkbox).data("name")== "has_member"){
      data = {union:{id: union_id, has_member_status: union_status_value}}
    }

    if($(checkbox).data("name") == "has_permit"){
      data = {union:{id: union_id, has_permit_status: union_status_value}}
    }

    $.ajax({
      url: "/admin/unions/" + union_id,
      method: "put",
      dataType:"json",
      data:data,
      success: function(response){

      }
    });

  }


//add roles to union by creating eligibilities
  $(".edit-roles").on("click",function(){

      var checkbox = $(this)
      var union_id = checkbox.closest(".union-info").data("union-id");
      var role_id = checkbox.prev().text();
      var eligibility_id = checkbox.data("eligibility-id");

      if (checkbox.is(":checked")) {
        //new eligibility

      $.ajax({
        url: "/admin/eligibilities",
        method:"post",
        dataType: "json",
        data:{eligibility: {   
                union_id: union_id, 
                role_id: role_id}},
        success: function(response){
          if (response.id) {
            $(checkbox).data("eligibility-id", response.id);
          } else {              
            var errors = response.toString();
            $(".union-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {
        //existing eligibility to be deleted 

      $.ajax({
        url: "/admin/eligibilities/" + eligibility_id,
        method:"delete",
        dataType: "json",
        data:{eligibility_id},
        success: function(response){
        }
      });

     };
  });

 $(".delete-union, .cancel-button").on("click", function(){ 

    var union_id = $(this).data("union-id");
    var union_name = $(this).closest(".in").data("name");
      $.ajax({
        url: "/admin/unions/" + union_id,
        method: "delete",
        success: function(response){   
          if (response.result) {
            $("#delete-union-success").show();
            $("#edit"+union_name).remove();
            $("#button"+union_name).remove();
            $("#editUnionToggle").children(".caret").toggleClass("rotated");

            // for cancel button
            $("#newUnion .union-name").text("");
            $("#newUnion .union-info").data("union-id", "");
            $("#newUnion .edit-roles").prop("checked", false);
            $("#newUnion").removeClass("in");

            setTimeout(function() {
                $("#delete-union-success").fadeOut();
            }, 3000);
          }
        }
      });

  });

  $("#save-new-union").on("click", function() {
    $("#newUnion").removeClass("in");
    $("#create-success").show(); // TODO: make this better
    setTimeout(function() {
      location.reload(true);
    }, 2000);


  });
  
//*********************************************************************************************************
// Add, Update or Delete Role Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".role-name").on("blur", function(){
    //Check to see if a role is already created and decide which url the ajax should send to(create/update) 
    var text_box = $(this);
    var role_id = text_box.closest(".role-info").data("role-id");
    if (role_id == "") {
      var url = "admin/roles";
      var method = "post";
    } else {
      var url = "admin/roles/" + role_id;
      var method = "put";
    }
    var name = text_box.closest(".role-name").text().trim();

    if (name == "") {
      text_box.addClass("invalid").next().show();
      return false;
    } else {
      $(".role-name-error").hide();
      text_box.addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{role: {name: name}},
        success: function(response){
          if (response.id) {
            text_box
              .closest(".role-info").data("role-id", response.id)
              .next(".role-info").data("role-id", response.id)
              .next(".role-info").children(".delete-role").data("role-id", response.id);  
            $("#newrole").data("name", response.name);
            $("#new-role-roles").show();
          } else {             
            var errors = response.toString();
            $(".role-name-error").text("*"+ errors).show();
            $(".role-name").addClass("invalid");   
          }
        }
      });
    }
  });

//add roles to unions by creating eligibilities
  $(".edit-unions").on("click",function(){

      var checkbox = $(this)
      var role_id = checkbox.closest(".role-info").data("role-id");
      var union_id = checkbox.prev().text();
      var eligibility_id = checkbox.data("eligibility-id");

      if (checkbox.is(":checked")) {
        //new eligibility

      $.ajax({
        url: "/admin/eligibilities",
        method:"post",
        dataType: "json",
        data:{eligibility: {   
                role_id: role_id, 
                union_id: union_id}},
        success: function(response){
          if (response.id) {
            checkbox.data("eligibility-id", response.id);
          } else {              
            var errors = response.toString();
            $(".role-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {
        //existing eligibility to be deleted 

      $.ajax({
        url: "/admin/eligibilities/" + eligibility_id,
        method:"delete",
        dataType: "json",
        data:{eligibility_id},
        success: function(response){
        }
      });

     };
  });

  $(".delete-role").on("click", function(){ 

    var role_id = $(this).data("role-id");

      $.ajax({
        url: "/admin/roles/" + role_id,
        method: "delete",
        success: function(response){    
          if (response.result) {
            $("#delete-role-success").show();
            $("#edit-role-"+role_id).remove();
            $("#button-role-"+role_id).remove();
            $("#editRoleToggle").children(".caret").toggleClass("rotated");

            // for cancel button
            $("#newRole .role-name").text("");
            $("#newRole .role-info").data("role-id", "");
            $("#newRole .edit-roles").prop("checked", false);
            $("#newRole").removeClass("in");

            setTimeout(function() {
                $("#delete-role-success").fadeOut();
            }, 3000);
          }
        }
      });

  });

  $("#save-new-role").on("click", function() {
    $("#newRole").removeClass("in");
    $("#create-success").show(); // TODO: make this better
    setTimeout(function() {
      location.reload(true);
    }, 2000);

  });
//*********************************************************************************************************
// Add, Update or Delete Certificate Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".certificate-name").on("blur", function(){
    //Check to see if a certificate is already created and decide which url the ajax should send to(create/update) 
    var text_box = $(this)

    var certificate_id = text_box.closest(".certificate-info").data("certificate-id");
    if (certificate_id == "") {
      var url = "admin/certificates";
      var method = "post";
    } else {
      var url = "admin/certificates/" + certificate_id;
      var method = "put";
    }
    var name = text_box.closest(".certificate-name").text().trim();

    if (name == "") {
      text_box.addClass("invalid").next().show();
      return false;
    } else {
      $(".certificate-name-error").hide();
      text_box.addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{certificate: {name: name}},
        success: function(response){
          if (response.id) {
            text_box
              .closest(".certificate-info").data("certificate-id", response.id)
              .next(".certificate-info").data("certificate-id", response.id)
              .next(".certificate-info").children(".delete-certificate").data("certificate-id", response.id);  
            $("#newCertificate").data("name", response.name);
            $("#new-certificate-users").show();
          } else {               
            var errors = response.toString();
            $(".certificate-name-error").text("*"+ errors).show();
            $(".certificate-name").addClass("invalid");   
          }
        }
      });
    }
  });

//add users to certificates by creating certifiables
  $(".edit-users").on("click",function(){

      var checkbox = $(this);
      var certificate_id = checkbox.closest(".certificate-info").data("certificate-id");
      var user_id = checkbox.prev().text();
      var certifiable_id = checkbox.data("certifiable-id");

      if (checkbox.is(":checked")) {
        //new certifiable

      $.ajax({
        url: "/admin/certifiables",
        method:"post",
        dataType: "json",
        data:{certifiable: {   
                certificate_id: certificate_id, 
                user_id: user_id}},
        success: function(response){
          if (response.id) {
            checkbox.data("certifiable-id", response.id);
          } else {              
            var errors = response.toString();
            $(".certificate-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {
        //existing certifiable to be deleted

      $.ajax({
        url: "/admin/certifiables/" + certifiable_id,
        method:"delete",
        dataType: "json",
        data:{certifiable_id},
        success: function(response){

        }
      });

     };
  });

  $(".delete-certificate").on("click", function(){ 

    var certificate_id = $(this).data("certificate-id");
      $.ajax({
        url: "/admin/certificates/" + certificate_id,
        method: "delete",
        success: function(response){    
          if (response.result) {
            $("#delete-certificate-success").show();
            $("#edit-cert-"+certificate_id).remove();
            $("#button-cert-"+certificate_id).remove();
            $("#editCertificateToggle").children(".caret").toggleClass("rotated");

            // for cancel button
            $("#newCertificate .certificate-name").text("");
            $("#newCertificate .certificate-info").data("certificate-id", "");
            $("#newCertificate .edit-users").prop("checked", false);
            $("#newCertificate").removeClass("in");

            setTimeout(function() {
                $("#delete-certificate-success").fadeOut();
            }, 3000);
          }
        }
      });

  });

  $("#save-new-certificate").on("click", function() {
    $("#newCertificate").removeClass("in");
    $("#create-success").show(); // TODO: make this better
    setTimeout(function() {
      location.reload(true);
    }, 2000);

  });

//*********************************************************************************************************
// Update or Delete User Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".user-name").on("blur", function(){
    //Check to see if a user is already created and decide which url the ajax should send to(create/update) 
    var user_id = $(this).closest(".user-info").data("user-id");
    if (user_id == "") {
      var url = "admin/users";
      var method = "post";
    } else {
      var url = "admin/users/" + user_id;
      var method = "put";
    }
    var name = $(this).closest(".user-name").text().trim();

    if (name == "") {
      $(this).addClass("invalid").next().show();
      return false;
    } else {
      $(".user-name-error").hide();
      $(this).addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{user: {name: name}},
        success: function(response){
          if (response.id) {
            $(".user-info").data("user-id", response.id);
            // $("#new-user-roles").show();
          } else {              
            var errors = response.toString();
            $(".user-name-error").text("*"+ errors).show();
            $(".user-name").addClass("invalid");   
          }
        }
      });
    }
  });


//add certificates to users by creating certifiables
  $(".edit-certificates").on("click",function(){

      var user_id = $(this).closest(".user-info").data("user-id");
      var certificate_id = $(this).prev().text();
      var certifiable_id = $(this).data("certifiable-id");
      var checkbox = $(this)

      if ($(this).is(":checked")) {
        //new certifiable

      $.ajax({
        url: "/admin/certifiables",
        method:"post",
        dataType: "json",
        data:{certifiable: {   
                certificate_id: certificate_id, 
                user_id: user_id}},
        success: function(response){
          if (response.id) {
            $(checkbox).data("certifiable-id", response.id);
          } else {              
            var errors = response.toString();
            $(".certificate-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {
 
      $.ajax({
        //existing certifiable to be deleted 
   
        url: "/admin/certifiables/" + certifiable_id,
        method:"delete",
        dataType: "json",
        data:{certifiable_id},
        success: function(response){
        }
      });

     };
  });


  $(".delete-user").on("click", function(event){ 
    $(this).hide()
    $(this).next().show();    
    event.preventDefault();
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name")
      $.ajax({
        url: "/admin/users/" + user_id,
        method: "delete",
        success: function(response){   
          if (response.result == true) { 
          
            $("#delete-user-success").show();

            setTimeout(function() {
              $("#delete-user-success").fadeOut();
              location.reload();
            }, 3000);
          
          }
        }
      });

    });


//*********************************************************************************************************
// Other Stuff Section (these are buggy)
//********************************************************************************************************

  $("h3.panel-title").on("click", function () {
    $(this).children("a").children(".caret").toggleClass("rotated");
  });

  $(".field").on("click", function () {
    $(this).children("a").children(".caret").toggleClass("rotated");
  });


//*********************************************************************************************************
// Edit Jobs (Job management using datatables)
//********************************************************************************************************
  $("#admin_job_management").DataTable({  
    responsive: true,
    "dom": '<"top"f>rt<"bottom"lip><"clear">',
    columnDefs: [ { 
      orderable: false,
      targets: [2] 
    } ]
  });

  var admin_user_table = $("#admin_edit_user").DataTable({
    responsive: true,
    "dom": '<"top"f>rt<"bottom"lip><"clear">',
    columnDefs: [ { 
      orderable: false,
      targets: [1,2] 
    } ]
  })

//*********************************************************************************************************
// Add Sponsors
//********************************************************************************************************
  $("#add_sponsor").on("click", function(event){
    $("#add_sponsor").hide();
    $("#submit_sponsor").show();
    event.preventDefault();
    var sponsor_name = $("#sponsor_name").val().trim();
    var sponsor_website = $("#sponsor_webiste").val().trim();
    if(sponsor_name == ""){
      alert("Name can't be blank")
      $("#add_sponsor").show();
      $("#submit_sponsor").hide();
      return false
    }else if (sponsor_website == ""){
      alert("Sponsor Website can't be blank")
      $("#add_sponsor").show();
      $("#submit_sponsor").hide();
      return false
    }else if (sponsor_name == "" && sponsor_website == ""){
      alert("Sponsor Name and Website can't be blank")
      $("#add_sponsor").show();
      $("#submit_sponsor").hide();
      return false
    }else{
      var formData = new FormData();
      $input=$("#upload_sponsor_picture");    
      formData.append("sponsor[picture]",$input[0].files[0]);
      $.ajax({
        url: "/sponsors",
        method: "post",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success:function(response){
          if (response.id > 0){         
            var sponsor_id = response.id
            $.ajax({
              url: "/sponsors/" + sponsor_id,
              method: "put",
              data: {sponsor:{website_url:sponsor_website, id: sponsor_id, name: sponsor_name}},
              success:function(response){
                if(response.id > 0){
                  $("#add-sponsor-success").show();
                  setTimeout(function() {
                  location.reload(true);
                  }, 2000); 
                }                
              }
            })
          }else{
            alert(response);          
            $("#submit_sponsor").hide();
            $("#add_sponsor").show();
          }
          
        }
      })


    }

    
    
    
  })
//*********************************************************************************************************
// Delete Sponsors
//********************************************************************************************************
  $(".delete_sponsor").on("click", function(event){
    event.preventDefault();
    $(this).hide();
    var confirmation = prompt("Are you Sure to delete this sponsor?(Yes/No)")
    if (confirmation == "Yes"){
      var sponsor_id = $(this).data("sponsorid")
      $(this).next().show();
      var delete_button = $(this);
      $.ajax({
        url: "/sponsors/" + sponsor_id,
        method: "delete",
        data:{sponsor:{id: sponsor_id}},
        complete: function(response){
          $(".delete-sponsor-success").show();
          setTimeout(function() {
            location.reload(true);
          }, 2000);
         
        }
      })
    }else{
      $(this).show();
      return false;
    }
  });
//*********************************************************************************************************
// Update Sponsors
//********************************************************************************************************
  $(".update_existing_sponsor").on("click", function(event){
    event.preventDefault();
    $(this).hide();// Update button disappeareas 
    $(this).next().show();// Spinning button shows up
    var sponsor_name = $(this).prev().find("#update_sponsor_name").val().trim()
    var sponsor_website = $(this).prev().find("#update_sponsor_webiste").val().trim();
    var sponsor_id = $(this).data("sponsorid");
    if($(this).prev().find("#update_sponsor_picture").val().trim().length == 0){
      updateSponsorNameImage(sponsor_name, sponsor_website,sponsor_id, $(this))
    }else{
      var formData = new FormData();
      $input=$(this).prev().find("#update_sponsor_picture");    
      formData.append("sponsor[picture]",$input[0].files[0])
      formData.append("sponsor[id]", sponsor_id)// To include sponsor id in the sponsor_params
      var update_button = $(this);
      $.ajax({
        url: "/sponsors/"+ sponsor_id,
        method: "put",
        data: formData, 
        cache: false,
        contentType: false,
        processData: false,
        success:function(response){
          updateSponsorNameImage(sponsor_name, sponsor_website,response.id, update_button)
        }
      });
    }

  });
//*********************************************************************************************************
// Sponsors Management Datatables
//********************************************************************************************************
  $("#admin_sponsors_management").DataTable({  
    responsive: true,
    "dom": '<"top"f>rt<"bottom"lip><"clear">',
    columnDefs: [ { 
      orderable: false,
      targets: [1,2,3,4] 
      
    } ]
  });


});

//*********************************************************************************************************
// common functions
//********************************************************************************************************
 
  function updateSponsorNameImage(sponsor_name, sponsor_website,sponsor_id, update_button){
    var error_message= $(update_button).prev().prev()
    if(sponsor_name == ""|| sponsor_website == ""){
      $(error_message).text("Name or Website can't be blank").show().delay(3000).fadeOut(1000);
      $(update_button).show();
      $(update_button).next().hide();
      return false;
    }else{
      $.ajax({
        url:"/sponsors/" + sponsor_id,
        method: "put",
        data: {sponsor:{id: sponsor_id, name: sponsor_name, website_url: sponsor_website}},
        success: function(response){
          $(update_button).show();
          $(update_button).next().hide();
          $(error_message).prev().show(); // Success message         
          setTimeout(function() {
            location.reload(true);
          }, 2000); 
        }
      });
    }
 

  }
