$(function(){

//*********************************************************************************************************
// Update or Delete Union Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".union-name").on("blur", function(){
    //Retrieve the info from union's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a union is already created and decide which url the ajax should send to(create/update) 
    var union_id = $(this).closest(".union-info").data("union-id");
    if (union_id == "") {
      var url = "admin/unions";
      var method = "post";
    } else {
      var url = "admin/unions/" + union_id;
      var method = "put";
    }
    var name = $(this).closest(".union-name").text().trim();

    if (name == "") {
      $(this).addClass("invalid").next().show();
      return false;
    } else {
      $(".union-name-error").hide();
      $(this).addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{union: {name: name}},
        success: function(response){
          if (response.id) {
            $(".union-info").data("union-id", response.id);
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

//add roles to union by creating eligibilities
  $(".edit-roles").on("click",function(){

      var union_id = $(this).closest(".union-info").data("union-id");
      var role_id = $(this).prev().text();
      var eligibility_id = $(this).data("eligibility-id");

      if ($(this).is(":checked")) {
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
            $(".edit-roles").data("eligibility-id", response.id);
          } else {              
            var errors = response.toString();
            $(".union-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {

      $.ajax({
        //existing eligibility to be deleted (this doesn't work)

        url: "/admin/eligibilities/" + eligibility_id,
        method:"delete",
        dataType: "json",
        data:{eligibility_id},
        success: function(response){
          console.log(response);
          // if (response.id) {
          //   $(".union-info").data("union-id", response.id);
          // } else {              
          //   var errors = response.toString();
          //   $(".union-name-error").text("*"+ errors).show();
          // }
        }
      });

     };
  });

$(".delete-union").on("click", function(){

    var union_id = $(this).closest(".union-info").data("union-id");
      $.ajax({
        url: "/admin/unions/" + union_id,
        method: "delete",
        success: function(response){    
          console.log('success');
          // window.location.reload;
        }
      });

  });
  

//*********************************************************************************************************
// Update or Delete Role Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".role-name").on("blur", function(){
    //Retrieve the info from role's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a role is already created and decide which url the ajax should send to(create/update) 
    var role_id = $(this).closest(".role-info").data("role-id");
    if (role_id == "") {
      var url = "admin/roles";
      var method = "post";
    } else {
      var url = "admin/roles/" + role_id;
      var method = "put";
    }
    var name = $(this).closest(".role-name").text().trim();

    if (name == "") {
      $(this).addClass("invalid").next().show();
      return false;
    } else {
      $(".role-name-error").hide();
      $(this).addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{role: {name: name}},
        success: function(response){
          if (response.id) {
            $(".role-info").data("role-id", response.id);
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
  $(".edit-roles").on("click",function(){

      var role_id = $(this).closest(".role-info").data("role-id");
      var union_id = $(this).prev().text();
      var eligibility_id = $(this).data("eligibility-id");

      if ($(this).is(":checked")) {
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
            $(".edit-roles").data("eligibility-id", response.id);
          } else {              
            var errors = response.toString();
            $(".role-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {

      $.ajax({
        //existing eligibility to be deleted (this doesn't work)

        url: "/admin/eligibilities/" + eligibility_id,
        method:"delete",
        dataType: "json",
        data:{eligibility_id},
        success: function(response){
          console.log(response);
          // if (response.id) {
          //   $(".role-info").data("role-id", response.id);
          // } else {              
          //   var errors = response.toString();
          //   $(".role-name-error").text("*"+ errors).show();
          // }
        }
      });

     };
  });

$(".delete-role").on("click", function(){

    var role_id = $(this).closest(".role-info").data("role-id");
      $.ajax({
        url: "/admin/roles/" + role_id,
        method: "delete",
        success: function(response){    
          console.log('success');
          // window.location.reload;
        }
      });

  });


//*********************************************************************************************************
// Update or Delete Certificate Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".certificate-name").on("blur", function(){
    //Retrieve the info from certificate's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a certificate is already created and decide which url the ajax should send to(create/update) 
    var certificate_id = $(this).closest(".certificate-info").data("certificate-id");
    if (certificate_id == "") {
      var url = "admin/certificates";
      var method = "post";
    } else {
      var url = "admin/certificates/" + certificate_id;
      var method = "put";
    }
    var name = $(this).closest(".certificate-name").text().trim();

    if (name == "") {
      $(this).addClass("invalid").next().show();
      return false;
    } else {
      $(".certificate-name-error").hide();
      $(this).addClass("valid");            

      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{certificate: {name: name}},
        success: function(response){
          if (response.id) {
            $(".certificate-info").data("certificate-id", response.id);
            $("#new-certificate-roles").show();
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

      var certificate_id = $(this).closest(".certificate-info").data("certificate-id");
      var user_id = $(this).prev().text();
      var certifiable_id = $(this).data("certifiable-id");

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
            $(".edit-roles").data("certifiable-id", response.id);
          } else {              
            var errors = response.toString();
            $(".certificate-name-error").text("*"+ errors).show();
          }
        }
      });

     } else {

      $.ajax({
        //existing certifiable to be deleted (this doesn't work)

        url: "/admin/certifiables/" + certifiable_id,
        method:"delete",
        dataType: "json",
        data:{certifiable_id},
        success: function(response){
          console.log(response);
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

    var certificate_id = $(this).closest(".certificate-info").data("certificate-id");
      $.ajax({
        url: "/admin/certificates/" + certificate_id,
        method: "delete",
        success: function(response){    
          console.log('success');
          // window.location.reload;
        }
      });

  });

});
