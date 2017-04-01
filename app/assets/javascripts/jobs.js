$(function(){


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





//===========================Notifications for Jobs Posted and Jobs Filled=============================



  $("#post_submit").on('click', function(e) {
    // var notifyTitle = "Title: " + $('#job_name').val() + '\n';
    var notifyTitle = `Title: ${$('#job_name').val()}\n`;
    var notifyRole = "Role: " + $(`#job_role_id option[value=${$('#job_role_id').val()}]`).text() + '\n';
    var notifyDescription = "Description: ".concat($('#job_description').val().toString());
    alert(notifyTitle + notifyRole + notifyDescription);
    localStorage.setItem('notifyTriple', notifyTitle + notifyRole + notifyDescription);
  });

  $(".alert-notice.alert").ready(function(){
    if ($(".alert-notice").text().includes('Confirmation email has been sent.')) {
      alert(localStorage.getItem('notifyTriple'));
      notifyMe('New Job Posted on Crew Call: \n' + localStorage.getItem('notifyTriple'));
    }
  });





//=====================================================================================================

});

//=====================================Helper Functions for Notifications==============================

function notifyMe(message) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}


//===========================Notifications: Service Workers and all that=============================



  // $("#post_submit").on('click', function(e) {
  //   // var notifyTitle = "Title: " + $('#job_name').val() + '\n';
  //   var notifyTitle = `Title: ${$('#job_name').val()}\n`;
  //   var notifyRole = "Role: " + $(`#job_role_id option[value=${$('#job_role_id').val()}]`).text() + '\n';
  //   var notifyDescription = "Description: ".concat($('#job_description').val().toString());
  //   alert(notifyTitle + notifyRole + notifyDescription);
  //   localStorage.setItem('notifyTriple', notifyTitle + notifyRole + notifyDescription);
  // });

  // $(".alert-notice.alert").ready(function(){
  //   if ($(".alert-notice").text().includes('published.')) {
  //     alert(localStorage.getItem('notifyTriple'));
  //     notifyMe('New Job Posted on Crew Call: \n' + localStorage.getItem('notifyTriple'));
  //   }
  // });

//   // Service Worker API
// // dictionary GetNotificationOptions {
// //   DOMString tag = "";
// // };

// // partial interface ServiceWorkerRegistration {
// //   Promise<void> showNotification(DOMString title, optional NotificationOptions options);
// //   Promise<sequence<Notification>> getNotifications(optional GetNotificationOptions filter);
// // };

// // [Constructor(DOMString type, NotificationEventInit eventInitDict),
// //  Exposed=ServiceWorker]
// // interface NotificationEvent : ExtendableEvent {
// //   readonly attribute Notification notification;
// //   readonly attribute DOMString action;
// // };

// // dictionary NotificationEventInit : ExtendableEventInit {
// //   required Notification notification;
// //   DOMString action = "";
// // };

// // partial interface ServiceWorkerGlobalScope {
// //   attribute EventHandler onnotificationclick;
// //   attribute EventHandler onnotificationclose;
// // };


// serviceWorkerRegistration.showNotification(title, options);

// {
//   "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
//   "icon": "images/ccard.png",
//   "vibrate": [200, 100, 200, 100, 200, 100, 400],
//   "tag": "request",
//   "actions": [
//     { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
//     { "action": "no", "title": "No", "icon": "images/no.png" }
//   ]
// }


// self.addEventListener('push', event => {
//   var dataPromise;
//   if (data in event) {
//     dataPromise = Promise.resolve(event.data.json());
//   } else {
//     dataPromise = fetch('notification/end/point/data.json')
//       .then(response => {
//         return response.json();
//       });
//   }

//   event.waitUntil(
//     dataPromise
//     .then(msgData => {
//       // Now tell the user.
//       return self.registration.showNotification(data.title, {
//         // Whether you show data and how much you show depends on
//         // content of the data itself.
//         body: event.data.body,
//         icon: 'images/icon.png'
//       });
//     })
//   );
// });


//===========================Notifications: Google Exercise stuff.=============================

// Added as part of notifications exercise!
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   console.log('Service Worker and Push is supported');

//   navigator.serviceWorker.register('sw.js')
//   .then(function(swReg) {
//     console.log('Service Worker is registered', swReg);

//     swRegistration = swReg;
//   })
//   .catch(function(error) {
//     console.error('Service Worker Error', error);
//   });
// } else {
//   console.warn('Push messaging is not supported');
//   pushButton.textContent = 'Push Not Supported';
// }



//========================================Common Function==============================================








