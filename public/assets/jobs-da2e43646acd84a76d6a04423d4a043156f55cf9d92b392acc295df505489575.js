$(function(){$("#job_posts_table").DataTable({responsive:!0,dom:'<"top"f>rt<"bottom"lip><"clear">',bSortClasses:!1}),$("#job_management").DataTable({responsive:!0,dom:'<"top"f>rt<"bottom"lip><"clear">',columnDefs:[{orderable:!1,targets:[2]}]}),$("#search_location").on("keyup",function(){$("#job_posts_table").DataTable().search(this.value).draw()}),$("#job_category").on("change",function(){var a=$(this).val(),t="\\b"+a+"\\b";if(0==a)return $("#job_posts_table").DataTable({destroy:!0}),!1;$("#job_posts_table").DataTable().column(4).search(t,!0,!1).draw()})});