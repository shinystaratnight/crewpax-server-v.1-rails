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
      $.ajax({
        url: "/roles/" + role_id + "/labels",
        method: "get",
        dataType: "json",
        data:{label:{role_id: role_id, job_board: job_board_status }},
        success: function(response){ 
          if (response == undefined){
            JobNotFound();
          }else {
            $(".job_detail").hide();
            $.map($(response), function(resp){ 
              $(".job_detail[data-job-id="+ resp.job_id + "]").show()
            });
          }
        }
        
      });
    }


    
  });

  //    
        //     $.map($(response), function(resp){   
     
        //       if(resp.job_id != null ){
        //         var job_id = resp.job_id;
        //         $(".job_detail[data-job-id="+ job_id + "]").show()
        //       }
        //     });
        //   }else{
        //     if(response[0].job_id == null){     
        //       JobNotFound();
        //     }else{
        //       $(".job_detail").hide();
        //       $(".job_detail[data-job-id="+ response[0].job_id + "]").show();
        //     }
        //   }
         
        // }
//======================================================================================================
//====================================Location Search Form Submit Through Ajax=======================================================
  // $("#search_location_form").on("submit", function(){
   
  //   $.get(this.action, $(this).serialize(), null, "script");

  // });




//===========================================Job Post Table Using DataTables Gem========================================================


  $("#job_posts_table").DataTable({
      responsive: true
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

