function ajaxUpdatePermit(e,a,t,i,s){$.ajax({url:"/eligibilities/"+t,method:"put",dataType:"json",data:{eligibility:{permit_days:e,id:t,user_id:i,role_id:a,union_id:s}},success:function(){}})}function ajaxDeleteEligibility(e,a,t){var i=$("#info").data("user-id");$.ajax({url:"/eligibilities/"+t,method:"delete",dataType:"json",data:{eligibility:{union_id:e,user_id:i,role_id:a}},success:function(){}})}function ajaxDeleteLabel(e,a){$.ajax({url:"/users/"+a,method:"delete",dataType:"json",data:{user:{roles_ids:[e]}},success:function(){}})}function ajaxCreateLabel(e,a){$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{roles_ids:[e]}},success:function(){}})}function ajaxRoles(e,a,t,i){$.ajax({url:"/eligibilities",method:"post",dataType:"json",data:{eligibility:{union_id:e,user_id:t,role_id:a}},success:function(e){i.data("eligibility-id",e.id)}})}function ajaxMember(e,a,t,i){var s=$(i).data("user-id")||$("#info").data("user-id");$.ajax({url:"/eligibilities",method:"post",dataType:"json",data:{eligibility:{member:e,union_id:a,user_id:s,role_id:t}},success:function(e){i.data("eligibility-id",e.id)}})}function ajaxPermit(e,a,t,i){var s=$(i).data("user-id")||$("#info").data("user-id");$.ajax({url:"/eligibilities",method:"post",dataType:"json",data:{eligibility:{permit_days:e,union_id:a,user_id:s,role_id:t}},success:function(e){i.data("eligibility-id",e.id)}})}function ajaxAddAvailability(e,a,t,i){var s=$("#info").data("user-id");$.ajax({url:"/users/"+s+"/appointments",method:"post",dataType:"json",data:{appointment:{day:e,user_id:s,date:a,week:t}},success:function(e){i.removeClass("btn-danger").addClass("btn-success"),i.data("availability-id",e.id)}})}function ajaxDeleteAvailability(e,a,t,i,s){$.ajax({url:"/appointments/"+i,method:"delete",dataType:"json",data:{appointment:{day:e,id:i,date:a,week:t}},success:function(){s.data("availability-id",""),s.removeClass("btn-success").addClass("btn-danger")}})}function ajaxCreateCertifiable(e,a){var t=$("#info").data("user-id");$.ajax({url:"/certifiables",method:"post",dataType:"json",data:{certifiable:{user_id:t,certificate_id:e}},success:function(e){a.data("certifiable-id",e.id)}})}function ajaxdeleteCertifiable(e,a){var t=$("#info").data("user-id"),i=$(".search-choice-close").data("certifiable-id");$.ajax({url:"/certifiables/"+i,method:"delete",dataType:"json",data:{certifiable:{user_id:t,id:i,certificate_id:e}},success:function(){a.data("certifiable-id","")}})}function labelSeletedDocument(e){$.each($(e),function(e,a){"true"==$(a).data("clickable")&&($(this).find(".file_info").find("i").css({color:"#5cb85c"}),$(this).find(".file_info").addClass("selected_document"))})}function resetDocumentDataAttr(e){$.each($(e),function(e,a){$(a).data("clickable",""),$(this).find(".file_info").removeClass("selected_document"),$(this).find(".file_info").find("i").css({color:"black"})})}function stateSwitch(e){$(e).on("switchChange.bootstrapSwitch",function(a,t){if("traffic_control"==$(e).data("section"))var i={user:{has_traffic_control_ticket:t}};else var i={user:{has_vehicle:t}};var s=$("#info").data("user-id");$.ajax({url:"/users/"+s,method:"put",dataType:"json",data:i,success:function(){}})})}$(function(){function e(){$("#password").hasClass("valid")&&$("#pw_confirmation").hasClass("valid")&&$("#email").hasClass("valid")&&$("#name").hasClass("valid")&&($("#profile-success").fadeIn(),setTimeout(function(){$("#profile-success").fadeOut()},3e3),$(".continue-registration").fadeIn())}function a(e,a){var t=$(e).data("union-name");$.each($("#"+t+"_roles").find(".roles:checkbox:checked"),function(e,t){var i=$(t).data("rolez-id"),s=$(t).data("eligibility-id"),d=$(t).data("user-id");ajaxDeleteEligibility(a,i,s),ajaxDeleteLabel(i,d),$(t).prop("checked",!1)})}function t(){var e=$("#weeklyDatePicker").val();$(this).hasClass("avail-collapse-toggle")&&(e=moment().format("MM-DD-YYYY"));var a=moment(e,"MM/DD/YYYY").day(0).format("YYYY-MM-DD"),t=moment(e,"MM/DD/YYYY").day(6).format("YYYY-MM-DD"),i=$("#info").data("user-id");$("#weeklyDatePicker").val(a+" - "+t),$("#date_range").text($("#weeklyDatePicker").val()),$("#sunday").data("date",a),$("#monday").data("date",moment(e,"MM/DD/YYYY").day(1).format("YYYY-MM-DD")),$("#tuesday").data("date",moment(e,"MM/DD/YYYY").day(2).format("YYYY-MM-DD")),$("#wednesday").data("date",moment(e,"MM/DD/YYYY").day(3).format("YYYY-MM-DD")),$("#thursday").data("date",moment(e,"MM/DD/YYYY").day(4).format("YYYY-MM-DD")),$("#friday").data("date",moment(e,"MM/DD/YYYY").day(5).format("YYYY-MM-DD")),$("#saturday").data("date",t),$.ajax({url:"/users/"+i+"/appointments",method:"get",dataType:"json",data:{appointment:{user_id:i}},success:function(e){if(0==e.length)$.each($("#day .btn"),function(){$(this).removeClass("btn-success").addClass("btn-danger")});else{var a=[],t=[];$.grep(e,function(e){a.push(e.date),t.push({date:e.date,availability_id:e.id})}),$.each($("#day .btn"),function(e,i){-1==$.inArray($(i).data("date"),a)?($(i).removeClass("btn-success").addClass("btn-danger"),$(i).data("availability-id","")):($(i).removeClass("btn-danger").addClass("btn-success"),$.map(t,function(e){e.date==$(i).data("date")&&$(i).data("availability-id",e.availability_id)}))})}}})}$("#name").on("blur",function(){var e=$("#info").data("user-id");if(""==e)var a="/users",t="post";else var a="/users/"+e,t="put";var i=$("#name").text().trim();if(""==i)return $(this).addClass("invalid").next().show(),!1;$("#name-error").hide(),$.ajax({url:a,method:t,dataType:"json",data:{user:{name:i}},success:function(e){if(e.id)$("#info").data("user-id",e.id),$("#name").addClass("valid");else{var a=e.toString();$("#name-error").text("*"+a).show(),$("#name").addClass("invalid")}}})}),$("#phone").on("blur",function(){var a=$("#info").data("user-id"),t=$("#phone").text().trim().replace(/[^0-9]/g,"");if(""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#phone-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{phone:t}},success:function(){$("#phone").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).toString();$("#phone").addClass("invalid"),$("#phone-error").text("*"+a).show()}})}),$("#email").on("blur",function(){var a=$("#info").data("user-id"),t=$("#email").text().trim();if(""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#email-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{email:t}},success:function(){$("#email").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).error||$.parseJSON(e.responseText).toString();$("#email").addClass("invalid"),$("#email-error").text("*"+a).show()}})}),$("#mailing_address").on("blur",function(){var e=$("#mailing_address_info").data("address-id");if(""==e)var a="/addresses",t="post";else var a="/addresses/"+e,t="put";var i=$("#mailing_address").text().trim(),s="Mailing",d=$("#info").data("user-id");if(""==i)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#mailing-address-error").hide(),$.ajax({url:a,method:t,dataType:"json",data:{address:{type:s,address_input:i,user_id:d}},success:function(e){e.id&&($("#mailing_address_info").data("address-id",e.id),$("#mailing_address").addClass("valid"))}})}),$("#billing_address").on("blur",function(){var e=$("#billing_address_info").data("billing-id");if(""==e)var a="/addresses",t="post";else var a="/addresses/"+e,t="put";var i=$("#billing_address").text().trim(),s="Billing",d=$("#info").data("user-id");if(""==i)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#billing-address-error").hide(),$.ajax({url:a,method:t,dataType:"json",data:{address:{type:s,address_input:i,user_id:d}},success:function(e){e.id&&($("#billing_address_info").data("billing-id",e.id),$("#billing_address").addClass("valid"))}})}),$("#shipping_address").on("blur",function(){var e=$("#shipping_address_info").data("shipping-id");if(""==e)var a="/addresses",t="post";else var a="/addresses/"+e,t="put";var i=$("#shipping_address").text().trim(),s="Shipping",d=$("#info").data("user-id");if(""==i)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#shipping-address-error").hide(),$.ajax({url:a,method:t,dataType:"json",data:{address:{type:s,address_input:i,user_id:d}},success:function(e){e.id&&($("#shipping_address_info").data("shipping-id",e.id),$("#shipping_address").addClass("valid"))}})}),$("[name='my-checkbox']").bootstrapSwitch(),stateSwitch($("#traffic_control")),stateSwitch($("#vehicle")),$("#upload_picture").on("change",function(){var e=new FormData,a=$("#info").data("user-id");$input=$("#upload_picture"),e.append("user[image]",$input[0].files[0]),$.ajax({url:"/users/"+a,data:e,cache:!1,contentType:!1,processData:!1,method:"put",success:function(){$("#profile_pic").text("Profile picture saved").show()}})}),$("#password").on("blur",function(){if(""==$(this).text().trim())return $(this).addClass("invalid"),$("#password-error").show(),!1;$("#password").addClass("valid"),e(),$("#password-error").hide()}),$("#password").pStrength({bind:"keyup change",changeBackground:!1,onPasswordStrengthChanged:function(e){$(this).text()?$.fn.pStrength("changeBackground",$(this),e):$.fn.pStrength("resetStyle",$(this))}}),$("#pw_confirmation").on("blur",function(){var a=$(this).text().trim(),t=$("#password").text().trim(),i=$("#info").data("user-id");return""==a?($(this).addClass("invalid"),$("#pw-confirmation-error").show(),!1):t!=a?($("#pw-confirmation-error").show(),!1):($("#pw-confirmation-error").hide(),void $.ajax({url:"/users/"+i,method:"put",dataType:"json",data:{user:{password:a}},success:function(){$("#pw_confirmation").addClass("valid"),e()}}))}),$("#pw_confirmation").pStrength({bind:"keyup change",changeBackground:!1,onPasswordStrengthChanged:function(e,a){$(this).text()?($.fn.pStrength("changeBackground",$(this),e),$("#pw_confirmation_strength_precentage").text("Your password strength is "+a+"%.")):$.fn.pStrength("resetStyle",$(this))},onValidatePassword:function(){$("#pw_confirmation_strength_precentage").text($("#pw_confirmation_strength_precentage").text()+" Great, now you can continue to register!")}}),$("#imdb").on("blur",function(){var a=$("#info").data("user-id"),t=$("#imdb").text().trim();if(alert(t),""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#imdb-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{imdb:t}},success:function(){$("#imdb").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).toString();$("#imdb").addClass("invalid"),$("#imdb-error").text("*"+a).show()}})}),$("#youtube").on("blur",function(){var a=$("#info").data("user-id"),t=$("#youtube").text().trim();if(""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#youtube-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{youtube:t}},success:function(){$("#youtube").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).toString();$("#youtube").addClass("invalid"),$("#youtube-error").text("*"+a).show()}})}),$("#vimeo").on("blur",function(){var a=$("#info").data("user-id"),t=$("#vimeo").text().trim().val();if(""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#vimeo-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{vimeo:t}},success:function(){$("#vimeo").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).toString();$("#vimeo").addClass("invalid"),$("#vimeo-error").text("*"+a).show()}})}),$("#linkedin").on("blur",function(){var a=$("#info").data("user-id"),t=$("#linkedin").text().trim();if(""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#linkedin-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{linkedin:t}},success:function(){$("#linkedin").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).toString();$("#linkedin").addClass("invalid"),$("#linkedin-error").text("*"+a).show()}})}),$("#facebook").on("blur",function(){var a=$("#info").data("user-id"),t=$("#facebook").text().trim();if(""==t)return $(this).addClass("invalid"),$(this).next().show(),!1;$("#facebook-error").hide(),$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{facebook:t}},success:function(){$("#facebook").addClass("valid"),e()},error:function(e){var a=$.parseJSON(e.responseText).toString();$("#facebook").addClass("invalid"),$("#facebook-error").text("*"+a).show()}})}),$(".notification-panel").on("change",function(){var a=$("#notification_form").data("user-id"),t="";t=$("#notify_never").prop("checked")?"never":$("#notify_always").prop("checked")?"always":"selected_roles",$.ajax({url:"/users/"+a,method:"put",dataType:"json",data:{user:{notify_when_job_posted:t}},success:function(){e()}})}),$(".union_member").on("click",function(){var e=$(this).parent().data("union-id");0==$(this).is(":checked")&&a($(this),e)}),$(".union_permit_days").on("click",function(){var e=$(this).data("union-name");if($(this).is(":checked"))$("#"+e+"_number_days").show(),$("#"+e+"_permit_days").show(),$("#"+e+"_permit_days").on("blur",function(){var a=$("#"+e+"_permit_days").text().trim();$("#"+e+"_permit").val(a)});else{$("#"+e+"_number_days").hide(),$("#"+e+"_permit_days").hide();var t=$("#"+e+"Status").data("union-id");a($(this),t)}}),$(".union_roles").find(".roles").on("click",function(){var e=$(this),a=e.data("union-name"),t=e.data("union-id"),i=e.data("rolez-id"),s=e.data("user-id")||$("#info").data("user-id");if($("#"+a+"_member").is(":checked")){var d=$("#"+a+"_member").val();if(e.is(":checked"))ajaxMember(d,t,i,e),ajaxCreateLabel(i,s);else{var n=e.data("eligibility-id");ajaxDeleteLabel(i,s),ajaxDeleteEligibility(t,i,n)}}else if($("#"+a+"_permit").is(":checked")){var d=$("#"+a+"_permit").val();if(e.is(":checked"))ajaxPermit(d,t,i,e),ajaxCreateLabel(i,s);else{var n=e.data("eligibility-id");ajaxDeleteEligibility(t,i,n),ajaxDeleteLabel(i,s)}}else 1==$(e).data("union-has-member")?(alert("You must indicate that you are a member"),e.attr("checked",!1)):1==$(e).data("union-has-permit")&&(alert("You must indicate that you have a permit"),e.attr("checked",!1))}),$(".permit_days_entry").on("blur",function(){var e=$(this).data("union-name");$("#"+e+"_roles").find(".roles:checkbox:checked")&&$.each($("#"+e+"_roles").find(".roles:checkbox:checked"),function(a,t){var i=$(t).data("rolez-id"),s=$(t).data("eligibility-id"),d=$(t).data("user-id")||$("#info").data("user-id");ajaxUpdatePermit($("#"+e+"_permit_days").text().trim(),i,s,d,$(t).data("union-id"))})}),$(".roles").on("click",function(){var e=$(this),a=e.data("user-id")||$("#info").data("user-id"),t=e.data("union-id"),i=e.data("rolez-id"),s=e.data("eligibility-id");e.data("union-name");if(0==$(e).data("union-has-member")&&0==$(e).data("union-has-permit"))if(e.is(":checked"))ajaxRoles(t,i,a,e),ajaxCreateLabel(i,a);else{var s=e.data("eligibility-id");ajaxDeleteLabel(i,a),ajaxDeleteEligibility(t,i,s)}}),$("#day .btn").on("click",function(){var e=$(this).data("availability-id");if(0==e){var a=$(this).data("day"),t=$(this).data("date"),i=$("#weeklyDatePicker").val();ajaxAddAvailability(a,t,i,$(this))}else if(e>0){var a=$(this).data("day"),t=$(this).data("date"),i=$("#weeklyDatePicker").val();ajaxDeleteAvailability(a,t,i,e,$(this))}}),$("#weeklyDatePicker").datepicker({format:"mm-dd-yyyy",todayHighlight:!0,forceParse:!1,autoclose:!0,disableTouchKeyboard:!1}),$("#weeklyDatePicker").on("change.dp",t),$(".avail-collapse-toggle").on("click",t),$(".chosen-select").chosen({width:"100%"}),$("#create-certificate").on("change",function(e,a){var t=a.selected,i=a.deselected;t>0?ajaxCreateCertifiable(t,$(".search-choice-close")):i>0&&ajaxdeleteCertifiable(i,$(".search-choice-close"))}),$("#file_upload_form").on("submit",function(e){var a=$("#recipient_email").val().trim(),t=$("#info").data("user-id"),i=$("#selected_file :selected").val(),s=new FormData;if($input=$("#upload_file"),0==$input[0].files.length)return $("#fail_msg").text("Attachment can't be blank, please choose your file").show().delay(3e3).fadeOut(1e3),!1;if(""==a)return $("#fail_msg").text("Recipient email can't be blank").show().delay(3e3).fadeOut(1e3),!1;var d=$input[0].files[0].name,n=t+"_"+i+"_"+d;s.append("attachment[file]",$input[0].files[0]),$("#fail_msg").hide(),e.preventDefault(),$("#submit_button").hide(),$("#uploading").show(),$.ajax({url:"/attachments",method:"post",dataType:"json",data:{attachment:{user_id:t,type:i,name:n,file:"null",client_email:a}},success:function(e){$("#selected_file :selected").data("attachment-id",e.id);var a=$("#selected_file :selected").data("attachment-id");e.id>0?$.ajax({url:"/attachments/"+a,method:"put",dataType:"json",data:s,cache:!1,contentType:!1,processData:!1,success:function(e){if(e.file_share_link===undefined)$("#fail_msg").text(e).show().delay(3e3).fadeOut(1e3),$("#uploading").hide(),$("#submit_button").show();else{$("#success_upload").show().delay(3e3).fadeOut(1e3),$("#uploading").hide(),$("#submit_button").show();var a=$("#file_template").clone();a.find("#document_info").data("file-id",e.id),a.find("#document_name").text(e.type),a.find(".ajax_document_delete").data("attachment-id",e.id),a.find(".document_share_link").attr("href",e.file_share_link),$("#new_file").append(a.show()),$("#success_msg").text(e.type+" has been sent to "+e.client_email+".").show().delay(3e3).fadeOut(1e3)}}}):($("#fail_msg").text(e).show().delay(3e3).fadeOut(1e3),$("#uploading").hide(),$("#submit_button").show())}})}),$("#new_file").on("click",".ajax_document_delete",function(){$(this).parentsUntil("#file_template").hide(),$("#ajax_document_deleting").show();var e=$(this).data("attachment-id");ajaxDeleteNewDocument(e,$("#ajax_document_deleting"),$(this))}),$("#new_file").on("click",".uploaded_file",function(){resetDocumentDataAttr($("#new_file .uploaded_file")),$(this).data("clickable","true"),labelSeletedDocument($(this))}),$("#email_form").on("submit",function(e){var a=$("#new_client_email").val().trim();if(""==a)return $("#fail_new_client_msg").text("Recipient email can't be blank").show().delay(3e3).fadeOut(1e3),!1;e.preventDefault(),$("#email_sent").hide(),$("#sending").show(),$.each($(".uploaded_file"),function(){if("true"==$(this).data("clickable")){var e=$(this).find(".file_info").data("file-id");$(this);$.ajax({url:"/attachments/"+e,method:"put",dataType:"json",data:{attachment:{client_email:a}},success:function(e){e.id>0?($("#success_sent").show().delay(3e3).fadeOut(1e3),$("#email_sent").show(),$("#sending").hide(),$("#success_new_client_msg").text(e.type+" has been successfully sent to "+e.client_email+".").show().delay(3e3).fadeOut(1e3)):($("#fail_new_client_msg").text(e).show().delay(3e3).fadeOut(1e3),$("#sending").hide(),$("#email_sent").show())}})}})}),$(".small-cal-browse").on("click",function(){$(this).parent().parent().addClass("browsing")})});