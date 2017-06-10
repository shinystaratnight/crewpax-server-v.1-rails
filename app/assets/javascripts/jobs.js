$(document).on('turbolinks:load', function(){


//===========================================Job Post Table Using DataTables Gem========================================================


  $("#job_posts_table").DataTable({
    responsive: true,
    "dom": '<"top"f>rt<"bottom"lip><"clear">',
    "bSortClasses": false,

  });

  $("#job_management").DataTable({
    responsive: true,
    "dom": '<"top"f>rt<"bottom"lip><"clear">',
    columnDefs: [ {
      orderable: false,
      targets: [2]
    } ]
  })

//========================================Search Location===============================================
  $("#search_location").on("keyup", function(){
    $("#job_posts_table").DataTable().search(this.value).draw();
  })


//=============================Search Jobs with specific roles=========================================
  $("#job_category").on("change", function(){
    var role_id = $(this).val();
    var regex = '\\b' + role_id + '\\b';

    if (role_id == 0){
      $("#job_posts_table").DataTable({
        destroy: true
      });
      return false;

    }else{
      $("#job_posts_table").DataTable()
                           .column(4)
                           .search(regex, true, false)
                           .draw();
    }

  });




//========================================Common Function==============================================


});




