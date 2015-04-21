
function timeAgo(selector) {

    var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };
    var template = function(t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function(time) {
        if (!time)
            return;
        // /time = new Date(time)

        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
                seconds < 45 && template('seconds', seconds) ||
                seconds < 90 && template('minute', 1) ||
                minutes < 45 && template('minutes', minutes) ||
                minutes < 90 && template('hour', 1) ||
                hours < 24 && template('hours', hours) ||
                hours < 42 && template('day', 1) ||
                days < 30 && template('days', days) ||
                days < 45 && template('month', 1) ||
                days < 365 && template('months', days / 30.41) ||
                years < 1.5 && template('year', 1) ||
                template('years', years)
                ) + templates.suffix;
    };

    var elements = document.getElementsByClassName('timeago');

    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
    //setTimeout(timeAgo, 60000);

}
// Anonymous "self-invoking" function

  	function loadMorsel(elmid,url) {

		var val =  url
 		var post_name = val.substr(val.lastIndexOf('/') + 1);
		var xmlhttp;
		var url ="https://api.eatmorsel.com/morsels/";
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 )	{
				if (xmlhttp.status==200){
					genrateResponse(xmlhttp,val,true,elmid);
				} else if (xmlhttp.status==404){
					genrateResponse(xmlhttp,val,false,elmid);
				}
			}
		}
			xmlhttp.open("GET",url+post_name,true);
			xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xmlhttp.send();
   	}


	function genrateResponse(xhr,val,status,elmid){

	 	var result = JSON.parse(xhr.response);

		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", "https://rawgit.com/nishant-n/morsel/morsel-wp-plugin-staging/embed.css");
		document.getElementsByTagName("head")[0].appendChild(fileref);

	  	var html = '';
		//html += '<div class="page-wrapper page-wrapper-details" style="overflow-y:auto;height:auto;margin:auto;"  onclick="window.open(\''+val+'\',\'_blank\')">';1
		html += '<div class="page-wrapper page-wrapper-details" style="overflow-y:auto;height:auto;margin:auto;">';

		if(status){

			var items = result.data.items;
			html +=      '<div class="modal-morsel-full-slide" >';
			html +=          '<div class="morsel-full">';
			html +=                '<div class="morsel-mobile-info" style="background-image:url(\''+result.data.primary_item_photos._320x320+'\')">';
			html +=   '<h2 bo-text="morsel.title" class="morsel-title"><a href="'+val+'" target="_blank">'+result.data.title+'</a></h2>';
			html +=   '<div class="user">\
			              <span class="profile-pic-link profile-pic-xs">';
			            html += '<img class="img-circle"  src="'+result.data.creator.photos._40x40+'"></span>';
			            html += '<br/><a href="https://www.eatmorsel.com/'+result.data.creator.username+'">'+result.data.creator.first_name+' '+result.data.creator.last_name+'</a>';
			            if(result.data.place){
			            	html += '<br/><span class="place-info">'+result.data.place.name+' '+result.data.place.city+' '+result.data.place.state+'</span>';
			            }
			            html +='<br/><abbr class="timeago time-info" title="'+result.data.created_at+'"></abbr>\
			            </div>\
			        </div>';

						/*for(index in items)
						{
						  html +='<div class="slide-item morsel-item " >\
						  <hr>\
						   <div class="item-img-wrap">\
						     <div ng-class="{\'image-loaded\':firstImageLoaded}" class="item-img image-loaded">\
						       <div>';
						        html += '<img bo-src="getItemPhoto(item)" src="'+items[index].photos._640x640+'">';
						      html += '</div>\
						    </div>\
						  </div>';
			html += '<div class="item-info">\
				        <div class="item-description">';
			html +='<p bo-html="formatDescription(item.description)">'+items[index].description+'</p>';
					html +='</div>\
							</div>\
						</div>';
						}*/
		    html += '</div>\
		    </div>\
			</div>';

		} else {
			console.log("Errors : ",result.errors);
			html +=     '<div class="error-page" >\
							<h1>Morsel</h1>\
							<p>Opps something wrong is happen!</p>\
						</div>\
					</div>';
		}

		var wrapper = document.getElementById(elmid);
	  	wrapper.innerHTML= html;
	  	timeAgo();
	}
	
