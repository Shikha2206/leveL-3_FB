$(document).ready(function(){
	 //login part
$("#portfolio").hide();
$("#FEED").hide();
$("#footerAPI").hide(); 
$("#Logout").hide();
$.ajaxSetup({
    error: function(xhr){
        alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
    }
});
  $("#logbtn").click(function(){
  	$.token=$("#accesstoken").val();
  	if($.token.length<6){
  		alert("please enter the valid accesstoken")
  	} else {
  		$.ajax({
  			url:'https://graph.facebook.com/v2.9/me?fields=cover%2Cpicture%2Cname%2Cfirst_name%2Cage_range%2Cgender%2Chometown&access_token='+$.token,
  			dataType:'JSON',
  			method:'GET',
  			success:function(response){
  				console.log(response);
  				$.responses = response;
				
  				$.url = response.picture.data.url;
  				$.nn = response.name;
  				$.age1 = response.age_range.min;
				if(response.hasOwnProperty('hometown'))
				{
  				$.hom = response.hometown.name;
				$("#hometown1").text($.hom);
				}
				else
				{
					alert("User Doesn't want to show");
				}
  				$("#main_heading").hide();
				$("#portfolio").show();
				$("#FEED").show();
                $("#footerAPI").show();
				$("#Logout").show();		 
  				$("#user").show();
  				$("#logoutbutton").show();
  				$("#username").text($.responses.first_name);
  				$("#profileimg").attr("src",$.url);
				if(response.hasOwnProperty('cover'))
				{
				$.cov=response.cover.source;
			    console.log($.cov);
				$("#portfolio").css("background-image",'url('+$.cov+')');
				}
				else{
				 alert("No cover page");
				}
  				$("#name1").text($.nn);
  				$("#prof1").attr("src",$.url);
  				$("#age").text($.age1+" "+"\+");
  				$("#frontcover").hide();
  			},
			error:function(){
                alert(errormessage);

            }
  		});	
  	}
  });
  
 	//feed part

	$("#fbtn").click(function(){
			$.ajax('https://graph.facebook.com/me?fields=email,name,hometown,feed.limit(4){from,message,created_time}&access_token='+$.token,{ 
			 success : function(response){ 
                    console.log(response); 
                    console.log(typeof(response)); 
					if(response.hasOwnProperty('feed'))
					{$.fee=response.feed.data;
                         for(let i in $.fee) 
                          {
                   if($.fee[i].message==null || $.fee[i].message=="undefined") 
                                   { 
                                    $.val="Can't Display the Message"; 
                      $("#feed").append("<span id='feed'>"+ $.fee[i].from.name +" "+":"+ $.val +$.fee[i].created_time + "</br>" +"</span>"); 
                                  } 
                              else{ 
                     console.log($.fee[i].message); 
                   $("#feed").append("<span id='feed'>"+ $.fee[i].from.name +" "+":"+ $.fee[i].message +"</br>" +"</span>"); 
                         }
					}
					}						      
                      else{ 
                         { 
                    alert("User does not want to display his feed details"); 
                        } 
                         } 
				}
				});
	});
		$.ajaxSetup({
    error: function(xhr){
        alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' ' + xhr.responseText);
    }
});
	//logout part
	$("#logoutbutton").click(function(){
		$("#main_heading").show();
		$("#portfolio").hide();
        $("#FEED").hide();
        $("#footerAPI").hide(); 
        $("#Logout").hide();
		
	});
});