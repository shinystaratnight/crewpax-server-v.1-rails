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
              .next(".union-info").children(".delete-union").data("union-id", response.id);  
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
  $("#has_member, #has_permit").on("click", function(){
    if ($(this).is(":checked")){      
      updateUnionStatus($(this))
    }else{

    }
  })

  function updateUnionStatus(checkbox){
    var union_id = $(checkbox).closest(".union-info").data("union-id")
    var union_status_value = $(checkbox).val();
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
          console.log(response.id);
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
          console.log("successfully deleted eligibility #"+eligibility_id);
        }
      });

     };
  });

 $(".delete-union").on("click", function(){ 

    var union_id = $(this).data("union-id");
    var union_name = $(this).closest(".in").data("name");

      $.ajax({
        url: "/admin/unions/" + union_id,
        method: "delete",
        success: function(response){   
          console.log('successfully deleted '+union_name);
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
          console.log(response.id);
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
          console.log("successfully deleted eligibility #" + eligibility_id);
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
          console.log('success');
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
          console.log(response.id);
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
          console.log("successfully deleted certifiable #" + certifiable_id);
          // if (response.id) {
          //   $(".certificate-info").data("certificate-id", response.id);
          // } else {              
          //   var errors = response.toString();
          //   $(".certificate-name-error").text("*"+ errors).show();
          // }
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
          console.log('success');
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


//add union roles to users by creating eligibilities
  // $(".edit-user-roles").on("click",function(){

  //     var checkbox = $(this)
  //     var user_id = checkbox.data("user-id");
  //     var union_id = checkbox.data("union-id");
  //     var role_id = checkbox.data("rolez-id");
  //     var eligibility_id = checkbox.data("eligibility-id")
      
  //     if (union_id > 2) { // that is, if it's not DGC or IATSE

  //       if (checkbox.is(":checked")) {
  //         //new eligibility

  //       $.ajax({
  //         url: "/admin/eligibilities",
  //         method:"post",
  //         dataType: "json",
  //         data:{eligibility: {   
  //                 union_id: union_id, 
  //                 role_id: role_id,
  //                 user_id: user_id}},
  //         success: function(response){
  //           console.log(response.id);
  //           if (response.id) {
  //             $(checkbox).data("eligibility-id", response.id);
  //           } else {              
  //             var errors = response.toString();
  //             // $(".certificate-name-error").text("*"+ errors).show();
  //           }
  //         }
  //       });

  //      } else {
  //          //existing eligibility to be deleted 

  //       $.ajax({
  //         url: "/admin/eligibilities/" + eligibility_id,
  //         method:"delete",
  //         dataType: "json",
  //         data:{eligibility_id},
  //         success: function(response){
  //           console.log("successfully deleted eligibility #" + eligibility_id);
  //         }
  //       });

  //     };
  //    }
  //   });




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
          console.log(response.id);
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
          console.log("successfully deleted certifiable #" + certifiable_id);
        }
      });

     };
  });


$(".delete-user").on("click", function(){ 

  var user_id = $(this).data("user-id");
  var user_name = $(this).closest(".in").data("name");
    $.ajax({
      url: "/admin/users/" + user_id,
      method: "delete",
      success: function(response){   
        console.log('successfully deleted '+user_name);
        if (response.result) {
          $("#delete-user-success").show();
          $("#edit"+user_name).remove();
          $("#button"+user_name).remove();

          setTimeout(function() {
              $("#delete-user-success").fadeOut();
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







});
