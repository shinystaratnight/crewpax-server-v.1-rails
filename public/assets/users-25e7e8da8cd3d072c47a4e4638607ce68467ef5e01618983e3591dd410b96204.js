function ajaxPreLoadUser(a,e,t,i,n,s,l){$.ajax({url:s,method:"get",dataType:"json",data:l,success:function(t){if(t==undefined||""==t.paginated_users)UserNotFound();else{var n=t.number_users;console.log(n),a.pageMax=Math.min(Math.max(a.pageMaxLo,3*Math.ceil(n/45)),a.pageMaxHi),pageCount=Math.ceil(n/a.pageMax);var r=$("#user_card_template").html();$.map(t.paginated_users,function(a){return e.push(a)}),n>a.pageMax?($(".pagination").remove(),paginate(pageCount,a,e,r),posts=t.paginated_users.slice(0,a.pageMax)):(posts=t.paginated_users,$(".pagination").hide()),loadPosts(posts,a,r),$(".pagination-prev").addClass("disabled"),$(".pagination-10-back").addClass("disabled"),$(".pagination-page, .pagination>li.pagination-next, .pagination>li.pagination-prev, .pagination>li.pagination-10-back, .pagination>li.pagination-10-ahead").on("click",function(){if($(this).hasClass("disabled"))event.preventDefault();else{$(".pagination-prev, .pagination-next").removeClass("disabled"),$(".pagination-10-back, .pagination-10-ahead").removeClass("disabled"),$(this).hasClass("pagination-next")?(gotoPageNumber=parseInt($(".pagination>li.active").data("page"))+1,disablePrevNextButton(gotoPageNumber,pageCount)):$(this).hasClass("pagination-prev")?(gotoPageNumber=parseInt($(".pagination>li.active").data("page"))-1,disablePrevNextButton(gotoPageNumber,pageCount)):$(this).hasClass("pagination-10-back")?(gotoPageNumber=parseInt($(".pagination>li.active").data("page"))-10,disablePrevNextButton(gotoPageNumber,pageCount)):$(this).hasClass("pagination-10-ahead")?(gotoPageNumber=parseInt($(".pagination>li.active").data("page"))+10,disablePrevNextButton(gotoPageNumber,pageCount)):(gotoPageNumber=$(this).data("page"),disablePrevNextButton(gotoPageNumber,pageCount));var t=!1;if($(".pagination-page[data-page="+gotoPageNumber+"]").length&&!$(".pagination-page[data-page="+gotoPageNumber+"]").hasClass("ellipsis")||(t=!0),gotoPageNumber%3==2)if(1==$(".pagination-page[data-page="+gotoPageNumber+"]").data("load"))changePage(pageCount,gotoPageNumber,e,a,r,t);else{changePage(pageCount,gotoPageNumber,e,a,r,t);var i=Math.ceil(n/30);(gotoPageNumber+1)/3<i&&(l.current_page_number=$(".pagination-page.active").data("page"),preloadUserData(gotoPageNumber,e,a,r,s,l))}else changePage(pageCount,gotoPageNumber,e,a,r,t)}}).filter('[data-page="'+i+'"]').addClass("active")}}})}function preloadUserData(a,e,t,i,n,s){$.ajax({url:n,method:"get",dataType:"json",data:s,success:function(t){t.paginated_users==undefined?$.map(t,function(a){return e.push(a)}):$.map(t.paginated_users,function(a){return e.push(a)}),$(".pagination-page[data-page="+a+"]").data("load",!0)}})}function ajaxAddAvailabilityProfile(a,e,t,i){var n=i.data("user-id");$.ajax({url:"/users/"+n+"/appointments",method:"post",dataType:"json",data:{appointment:{day:a,user_id:n,date:e,week:t}},success:function(a){i.removeClass("unavailable").addClass("available").find(".dot").css("background-color","#22aa22"),i.attr("data-availability-id",a.id),i.data("availability-id",a.id)}})}function ajaxDeleteAvailabilityProfile(a,e,t,i,n){$.ajax({url:"/appointments/"+i,method:"delete",dataType:"json",data:{appointment:{day:a,id:i,date:e,week:t}},success:function(){n.data("availability-id",""),n.attr("data-availability-id",""),n.removeClass("available").addClass("unavailable").find(".dot").css("background-color","#aa2222")}})}function markFilterparams(a){"has_a_vehicle"==a&&($("#union_member, #union_permit").data("clickable",""),$("#has_a_vehicle").data("clickable","clicked")),"union_member"==a&&($("#has_a_vehicle, #union_permit").data("clickable",""),$("#union_member").data("clickable","clicked")),"union_permit"==a&&($("#has_a_vehicle, #union_member").data("clickable",""),$("#union_permit").data("clickable","clicked"))}function disablePrevNextButton(a,e){a>e-10&&$(".pagination-10-ahead").addClass("disabled"),a<11&&$(".pagination-10-back").addClass("disabled"),a==e&&$(".pagination-next").addClass("disabled"),0!=a&&1!=a||$(".pagination-prev").addClass("disabled")}function range(a){return a?range(a-1).concat(a):[]}function range2(a,e){return e>=a?range2(a,e-1).concat(e):[]}function paginate(a,e,t,i){if(a<=15)var n=$("#pagination-template").html(),s=Handlebars.compile(n),l={pages:range(a)},r=s(l);else if(a<=37)var n=$("#pagination-template-1-ellipsis").html(),s=Handlebars.compile(n),l={pages1:range(7),ellipsisPage:Math.floor((7+a-6)/2),pages2:range2(a-6,a)},r=s(l);else var o=Math.ceil((1+a)/2)-2,n=$("#pagination-template-2-ellipses-large").html(),s=Handlebars.compile(n),l={pages1:range(4),ellipsisPage1:Math.floor((4+o)/2),pages2:range2(o,o+4),ellipsisPage2:Math.floor((o+4+a-3)/2),pages3:range2(a-3,a)},r=s(l);$("#user-pagination").append(r),$(".pagination>li.pagination-page").on("click",function(){changePage(a,$(this).data("page"),t,e,i,$(this).hasClass("ellipsis"))}).filter('[data-page="1"]').addClass("active")}function changePage(a,e,t,i,n,s){if($(".pagination>li.pagination-page").removeClass("active"),$(".pagination>li.pagination-page").filter('[data-page="'+e+'"]').addClass("active"),loadPosts(t.slice(e*i.pageMax-i.pageMax,e*i.pageMax),i,n),s){if(a<=37)if(e<=7||e>a-7)var l=$("#pagination-template-1-ellipsis").html(),r=Handlebars.compile(l),o={pages1:range(7),ellipsisPage:Math.floor((7+a-6)/2),pages2:range2(a-6,a)};else if(e<=13)var l=$("#pagination-template-1-ellipsis").html(),r=Handlebars.compile(l),o={pages1:range2(1,13),ellipsisPage:Math.floor((13+a)/2),pages2:[a]};else if(a-e<=12)var l=$("#pagination-template-1-ellipsis").html(),r=Handlebars.compile(l),o={pages1:[1],ellipsisPage:Math.floor((1+a-12)/2),pages2:range2(a-12,a)};else var l=$("#pagination-template-2-ellipses-medium").html(),r=Handlebars.compile(l),o={pages1:[1],ellipsisPage1:7,pages2:range2(14,24),ellipsisPage2:Math.floor((24+a)/2),pages3:[a]};else if(e<=4||a-e<=3){var g=Math.ceil((1+a)/2)-2,l=$("#pagination-template-2-ellipses-large").html(),r=Handlebars.compile(l);if(e<=4)var o={pages1:range(4),ellipsisPage1:e+5,pages2:range2(g,g+4),ellipsisPage2:Math.min(g+5+e,a-2),pages3:range2(a-3,a)};else var o={pages1:range(4),ellipsisPage1:Math.max(3,g-a+e),pages2:range2(g,g+4),ellipsisPage2:e-5,pages3:range2(a-3,a)}}else{var p=Math.ceil((1+a)/2)-5,d=p-1-(p-1)%5+4,u=a-(p-1-(p-1)%5-1);if(e>d&&e<u)var l=$("#pagination-template-2-ellipses-large").html(),r=Handlebars.compile(l),o={pages1:[1],ellipsisPage1:p-5+(e-p)%5,pages2:range2(p,p+10),ellipsisPage2:p+10+5-(p+10-e)%5,pages3:[a]};else{var l=$("#pagination-template-3-ellipses").html(),r=Handlebars.compile(l),c=e-e%5;if(e<=d)var o={pages1:[1],ellipsisPage1:Math.max(3,e-5),pages2:range2(c,c+4),ellipsisPage2:e+5,pages3:range2(a-c-3,a-c+1),ellipsisPage3:Math.min(a-c+6,a-2),pages4:[a]};else{hiDelta=a-c-4;var o={pages1:range(1),ellipsisPage1:Math.max(3,1+hiDelta+c-5),pages2:range2(1+hiDelta,1+hiDelta+4),ellipsisPage2:e-5,pages3:range2(c,c+4),ellipsisPage3:Math.min(e+5,a-2),pages4:[a]}}}}var m=r(o);$(".pagination").replaceWith(m),e<=10&&$(".pagination-10-back").addClass("disabled"),a-e<10&&$(".pagination-10-ahead").addClass("disabled"),$(".pagination-page, .pagination>li.pagination-next, .pagination>li.pagination-prev, .pagination>li.pagination-10-back, .pagination>li.pagination-10-ahead").on("click",function(){var e=-1;if($(this).hasClass("disabled"))event.preventDefault();else{$(".pagination-prev, .pagination-next").removeClass("disabled"),$(".pagination-10-back, .pagination-10-ahead").removeClass("disabled"),$(this).hasClass("pagination-next")?(e=parseInt($(".pagination>li.active").data("page"))+1,disablePrevNextButton(e,a)):$(this).hasClass("pagination-prev")?(e=parseInt($(".pagination>li.active").data("page"))-1,disablePrevNextButton(e,a)):$(this).hasClass("pagination-10-back")?(e=parseInt($(".pagination>li.active").data("page"))-10,disablePrevNextButton(e,a)):$(this).hasClass("pagination-10-ahead")?(e=parseInt($(".pagination>li.active").data("page"))+10,disablePrevNextButton(e,a)):(e=$(this).data("page"),disablePrevNextButton(e,a));var s=!1;if($(".pagination-page[data-page="+e+"]").length&&!$(".pagination-page[data-page="+e+"]").hasClass("ellipsis")||(s=!0),e%3==2)if(1==$(".pagination-page[data-page="+e+"]").data("load"))changePage(a,e,t,i,n,s);else{changePage(a,e,t,i,n,s);Math.ceil(dataCount/30)}else changePage(a,e,t,i,n,s)}}).filter('[data-page="'+e+'"]').addClass("active")}}function loadPosts(a,e,t){e.postsDiv.empty(),$.each(a,function(){var a=Handlebars.compile(t),i={id:this.user_info.id,name:this.user_info.name,vehicle:this.user_info.has_vehicle,image:this.user_info.image.url,phone:this.user_info.phone,union_member:this.union_member,union_permit:this.union_permit,availability:this.availabilities,path:"users/"+this.user_info.id},n=a(i);e.postsDiv.append(n)})}function UserNotFound(){$(".user-card, .pagination").hide(),$("#label_not_found").text("Users not found.").show().delay(3e3).fadeOut(1e3)}$(function(){if("/users"==window.location.pathname){var a=[],e=$(location).attr("search").match(/\d+/);e=null==e?0:e[0];var t={pageMaxLo:9,pageMaxHi:18,pageMax:12,postsDiv:$("#user-list")};if(0==e){var i=e;ajaxPreLoadUser(t,a,"",i,"","/users",{current_page_number:i})}}$("#user_role").on("change",function(){var a=$(this).val();if(0==a&&""==$(this).data("selected-user-role"))return $(".user-card").show(),!1;$(this).data("selected-user-role","clicked");var e=$(this).data("selected-user-role"),i=$(".pagination-page").data("page"),n=[],s="/roles/"+a+"/labels",l={label:{role_id:a,hiring_board:e},current_page_number:i};0==a&&(s="/users",l={current_page_number:0},a="",e=""),ajaxPreLoadUser(t,n,a,i,e,s,l)}),$("#has_a_vehicle > a, #union_member > a, #union_permit > a").on("click",function(a){a.preventDefault(),console.log("pagination?: "+$(".pagination-page").data("page"));var e,i=0,n=$("#user_role option:selected").val(),s=[],l="",r="/users/search";"Has a Vehicle"==$(this).text()?(markFilterparams("has_a_vehicle"),e=""==n?{has_vehicle:!0,current_page_number:i}:{role_id:n,has_vehicle:!0,current_page_number:i}):"Union Status: Member"==$(this).text()?(markFilterparams("union_member"),e=""==n?{union_member:!0,current_page_number:i}:{role_id:n,union_member:!0,current_page_number:i}):"Union Status: Permit"==$(this).text()&&(markFilterparams("union_permit"),e=""==n?{union_permit:!0,current_page_number:i}:{role_id:n,union_permit:!0,current_page_number:i}),ajaxPreLoadUser(t,s,n,i,l,r,e)}),$("#available_soon > a, #most_recent_log_in > a").on("click",function(a){a.preventDefault();var e=0,i=$("#user_role option:selected").val(),n=[],s="",l="/users/sort";if("clicked"==$("#has_a_vehicle").data("clickable"))var r={query:"has_vehicle"};else if("clicked"==$("#union_member").data("clickable"))var r={query:"union_member"};else if("clicked"==$("#union_permit").data("clickable"))var r={query:"union_permit"};else var r="";if(""==i){if("most_recent"==$(this).data("availability"))var o={current_page_number:e,availability:"most_recent",filter_element:r};else if("most_recent"==$(this).data("last-log-in"))var o={current_page_number:e,last_log_in:"most_recent",filter_element:r}}else if("most_recent"==$(this).data("availability"))var o={current_page_number:e,availability:"most_recent",role_id:i,filter_element:r};else if("most_recent"==$(this).data("last-log-in"))var o={current_page_number:e,last_log_in:"most_recent",role_id:i,filter_element:r};ajaxPreLoadUser(t,n,i,e,s,l,o)}),Handlebars.registerHelper("hasVehicle",function(a){if(1==a)return"<span id='user_has_vehicle'><i class='fa fa-car' aria-hidden='true' style='font-size: 20px; margin-left: 10px;'></i> Has a vehicle</span>"}),Handlebars.registerHelper("unionStatus",function(a,e){return a.length>0&&e.length>0?"Union:member: "+a+"; </br> permit:"+$.map(e,function(a){return a.union_name}).join(",")+" "+$.map(e,function(a){return a.permit_days}).join(",")+" days":a.length>0&&0==e.length?"Union:member: "+a:0==a.length&&e.length>0?"Union:permit: "+$.map(e,function(a){return a.union_name}).join(",")+" "+$.map(e,function(a){return a.permit_days}).join(",")+" days":"Non Union"}),Handlebars.registerHelper("isAvailableToday",function(a){function e(a){return(a<10?"0":"")+a}var t=new Date,i=e(t.getDate()),n=e(t.getMonth()+1),s=t.getFullYear(),l=s+"-"+n+"-"+i;return $.inArray(l,a)<0?"<button class='btn btn-danger' style='font-size: 12px;'>Unavailable </br>Today</button>":"<button class='btn btn-success' style='font-size: 12px;'>Available </br>Today</button>"}),Handlebars.registerHelper("classNameByAvailability",function(a,e,t){function i(a){return(a<10?"0":"")+a}var n=new Date,s=i(n.getDate()),l=i(n.getMonth()+1),r=n.getFullYear(),o=r+l+s;e=e.toString(),dashedDay=e.substring(0,4)+"-"+e.substring(4,6)+"-"+e.substring(6,8);var g=((new Date(dashedDay).getDay()+1)%7).toString(),p="day ";return p+="wday-"+g,p+=e==o?" today ":e<o?" past ":" future ",e==t.toString()&&(p+="start-date "),e.substring(4,6)!=t.toString().substring(4,6)?p+=e<t?"prev-month ":"next-month ":p+="current-month ",-1!=a.indexOf(dashedDay)?p+="available":p+="unavailable",p}),Handlebars.registerHelper("idReturn",function(a){return newId=Number(a),console.log(newId),newId}),$(document).on("click",".send_text",function(){var a=$(this).parent().next(),e=a.find(".message-text"),t=a.find(".character_counter"),i=160-e.val().trim().length;t.text(i+" characters remaining");var n;$(e).on("keyup",function(){var a=160-e.val().trim().length;t.text(a+" characters remaining"),n=e.val().trim()}),$(".send_msg").on("click",function(e){e.preventDefault();var t=a.find("#recipient").text(),i=a.find("#recipient_id").text();if(n==undefined)return a.find(".message_status").text("Text message can not be blank.").removeClass("alert-info").addClass("alert-danger").show().delay(3e3).fadeOut(1e3),!1;$.ajax({url:"/messages",method:"post",dataType:"json",data:{message:{content:n,recipient_id:i},recipient_phone:t},success:function(e){"queued"==e?a.find(".message_status").text("Text message has been sent successfully.").removeClass("alert-danger").addClass("alert-success").show():a.find(".message_status").text("Failed to send text message.").show()}})})}),$(".profile-day.future.current-user-true, .profile-day.today.current-user-true").on("click",function(){function a(a){return new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds())}var e=new Date($(this).find(".today-date").text());e=a(e);var t=e.getDay(),i=(e.getDate()-t).toString()+" - "+(e.getDate()-t+6).toString();if($(this).hasClass("unavailable"))ajaxAddAvailabilityProfile(t,e,i,$(this));else{ajaxDeleteAvailabilityProfile(t,e,i,$(this).data("availability-id"),$(this))}}),$(document).on("click",".small-cal-browse",function(){$(this).parent().parent().addClass("browsing")})});