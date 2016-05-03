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
  
});
