$(function(){
//=============================Search Jobs with specific roles=========================================  
  $("#job_category").on("change", function(){
    var role_id = $(this).val();
    if (role_id == 0){
      $(".job_detail").show();
      return false;
    }else{
      $(this).data("job-role", "clicked");
      var job_board_status = $(this).data("job-role")
      searchJobLabel(role_id, job_board_status)
      
    }


    
  });


//======================================================================================================
//====================================Location Search Form Submit Through Ajax=======================================================
  $("#search_location_form").on("submit", function(event){
    event.preventDefault(); 
    var role_id = $("#job_category option:selected").val()
    var search_content = $("#search_location").val()
    if (search_content == "" && role_id == ""){
      $(".job_detail").show()

    }else if (search_content == "" && role_id != ""){
      var job_board_status = "clicked"     
      searchJobLabel(role_id, job_board_status)
    }else{      
      $.ajax({
        url:"/jobs",
        method: "get",
        dataType: "json",
        data: {job:{role_id}, search_content: search_content},
        success:function(response){
          if(response == undefined || $.isEmptyObject(response)){
            JobNotFound();
          }else{
            $(".job_detail").hide();
            $.map($(response), function(resp){             
              $(".job_detail[data-job-id="+ resp.id + "]").show()
            });
          }       
        }
      });      
    } 
  });




//===========================================Job Post Table Using DataTables Gem========================================================


  $("#job_posts_table").DataTable({
      responsive: true,
      "dom": '<"top"f>rt<"bottom"lip><"clear">'
    // initComplete: function () {

    //   this.api().columns().every(function(){
    //     var column = this;

    //     var select = $('<select><option value=""></option></select>')
    //                 .appendTo( $(column.footer()).empty() )
    //                 .on( 'change', function () {
    //                     var val = $.fn.dataTable.util.escapeRegex(
    //                         $(this).val()
    //                     );
    //                     column.search( val ? '^'+val+'$' : '', true, false )
    //                           .draw();
    //                     } ); 
    //             column.data().unique().sort().each( function ( d, j ) {
    //                 select.append( '<option value="'+d+'">'+d+'</option>' )
    //             } );
    //     });
    //   }
  });




//=================================================================================================================================



});



//========================================Common Function===============================================
  function JobNotFound(){
    $(".job_detail").hide();
    $("#label_not_found").text("Job posts not found.").show().delay(3000).fadeOut(1000);
  }
  

  function searchJobLabel(role_id, job_board_status){
    $.ajax({
        url: "/roles/" + role_id + "/labels",
        method: "get",
        dataType: "json",
        data:{label:{role_id: role_id, job_board: job_board_status }},
        success: function(response){ 
          if (response == undefined){
            JobNotFound();
            $("#job_category").data("job-role", "")
          }else {
            $(".job_detail").hide();
            $("#job_category").data("job-role", "")
            $.map($(response), function(resp){ 
              $(".job_detail[data-job-id="+ resp.job_id + "]").show();
            });
          }
        }
        
      });
  }
