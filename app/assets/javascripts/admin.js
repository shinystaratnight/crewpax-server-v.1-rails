$(function(){

//*********************************************************************************************************
// Update or Delete Union Section
//********************************************************************************************************
//When a mouse leaves the entry div, it will trigger ajax
  $(".union-name").on("blur", function(){
    //Retrieve the info from union's entries and turn data into a nicely structured object (nesting included!)
    //Check to see if a union is already created and decide which url the ajax should send to(create/update) 
    var union_id = $(".union-info").data("union-id");
    if (union_id == "") {
      var url = "/unions";
      var method = "post";
            console.log('we did a new one');

    } else {
      var url = "/unions/" + union_id;
      var method = "put";
            console.log('we did a put');

    }
    var name = $(".union-name").text().trim();
    // There are two rounds of validations, front-end and back-end. Here's the front-end validation
    if (name == "") {
      $(this).addClass("invalid").next().show();
      return false;
    } else {
      $(".union-name-error").hide();
      $.ajax({
        url: url,
        method:method,
        dataType: "json",
        data:{union: {name: name}},
        success: function(response){
          if (response.id) {
            $(".union-info").data("union-id", response.id);
            $(".union-name").addClass("valid");
          } else {              
            var errors = response.toString();
            $(".union-name-error").text("*"+ errors).show();
            $(".union-name").addClass("invalid");   
          }
        }
      });
    }
      // return false;
  });
});