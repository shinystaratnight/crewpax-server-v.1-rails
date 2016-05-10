$(function(){

//*********************************************************************************************************
// Add, Update or Delete Union Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".union-name").on("blur", function(){
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
    var div_we_want = "#edit"+union_name;
    
    console.log(div_we_want)
      $.ajax({
        url: "/admin/unions/" + union_id,
        method: "delete",
        success: function(response){   
          console.log('successfully deleted '+union_name);
          if (response.result) {
            $("#delete-union-success").show();
            $(div_we_want).hide();

            setTimeout(function() {
                $("#delete-union-success").fadeOut();
            }, 2000);
          }
        }
      });

  });
  
//*********************************************************************************************************
// Add, Update or Delete Role Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".role-name").on("blur", function(){
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
            setTimeout(function() {
                $("#delete-role-success").fadeOut();
            }, 2000);
          }
        }
      });

  });


//*********************************************************************************************************
// Add, Update or Delete Certificate Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".certificate-name").on("blur", function(){
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
            setTimeout(function() {
                $("#delete-certificate-success").fadeOut();
            }, 2000);
          }
        }
      });

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
  $(".edit-user-roles").on("click",function(){

      var checkbox = $(this)
      var user_id = checkbox.closest(".user-info").data("user-id");
      var union_id = checkbox.prev().text();
      var role_id = checkbox.data("role-id");
      var eligibility_id = checkbox.data("eligibility-id")
      
      if (checkbox.is(":checked")) {
        //new certifiable

      $.ajax({
        url: "/admin/eligibilities",
        method:"post",
        dataType: "json",
        data:{eligibility: {   
                union_id: union_id, 
                role_id: role_id,
                user_id: user_id}},
        success: function(response){
          console.log(response.id);
          if (response.id) {
            $(checkbox).data("eligibility-id", response.id);
          } else {              
            var errors = response.toString();
            // $(".certificate-name-error").text("*"+ errors).show();
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
      $.ajax({
        url: "/admin/users/" + user_id,
        method: "delete",
        success: function(response){    
          console.log('success');
          if (response.result) {
            $("#delete-user-success").show();
            setTimeout(function() {
                $("#delete-user-success").fadeOut();
            }, 2000);
          }
        }
      });

  });

});
