// Anonymous "self-invoking" function
(function() {
    
  function loadMorsel()
	{
		var val =  document.getElementById("morsel-embed").href   
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
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				genrateResponse(xmlhttp,val)
			}
		}
			xmlhttp.open("GET",url+post_name+".json",true);
			xmlhttp.send();
		}


 function genrateResponse(xhr,val){

 	var result = JSON.parse(xhr.response);
	var fileref=document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", "http://localhost/backup/embed.css");
	document.getElementsByTagName("head")[0].appendChild(fileref) //

  var items = result.data.items;
  var html = '';
	html += '<div class="page-wrapper page-wrapper-details" style="overflow-y:auto;height:100%;margin:auto;"  onclick="window.open(\''+val+'\',\'_blank\')">';
	html +=      '<div class="modal-morsel-full-slide" >';
	html +=          '<div class="morsel-full">';
	html +=                '<div class="morsel-mobile-info">';
	html +=   '<h2 bo-text="morsel.title" class="morsel-title">'+result.data.title+'</h2>';
	html +=   '<div class="user">\
	              <span class="profile-pic-link profile-pic-xs">';
	                 html += '<img class="img-circle"  src="'+result.data.creator.photos._40x40+'">';
	             html += '</span>\
	               '+result.data.creator.first_name+' '+result.data.creator.last_name+'\
	          </div>\
	        </div>';

				for(index in items)
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
				}
    html += '</div>\
    </div>\
	</div>';

	var wrapper = document.getElementById('morsel-embed-wrapper');		
  wrapper.innerHTML= html;
}
	loadMorsel();
})();