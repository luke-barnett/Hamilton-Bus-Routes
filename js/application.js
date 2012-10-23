var routeDetails = 
[
{"id":"route-01","name":"Route 1"},
{"id":"route-02","name":"Route 2"},
{"id":"route-03","name":"Route 3"},
{"id":"route-04","name":"Route 4"},
{"id":"route-05","name":"Route 5"},
{"id":"route-06","name":"Route 6"},
{"id":"route-07","name":"Route 7"},
{"id":"route-08","name":"Route 8"},
{"id":"route-09","name":"Route 9"},
{"id":"route-10","name":"Route 10"},
{"id":"route-11","name":"Route 11"},
{"id":"route-12","name":"Route 12"},
{"id":"route-13","name":"Route 13"},
{"id":"route-14","name":"Route 14"},
{"id":"route-15","name":"Route 15"},
{"id":"route-16","name":"Route 16"},
{"id":"route-17","name":"Route 17"},
{"id":"route-18","name":"Route 18"},
{"id":"route-CE","name":"Route CE"},
{"id":"route-OB","name":"Orbitor"}
]

function reset(){
	$("#sidebar").empty();

	$('path[class="route"]').each(function(){
		$(this).removeAttr("opacity");
		$(this).removeAttr("selected");
	});
}

function processRoute(itemId){
	var _item = $.grep(routeDetails, function(obj){
		return obj.id === itemId;
	})[0];
	
	var _sidebar = $("#sidebar");
	
	_sidebar.empty();
	_sidebar.append($("<h1>").append(_item.name));
}

function initRoutes(){
	var _routes = $('path[class="route"]');
	_routes.each(function(){
		$(this).click(function(){
			//Add any functionality on click here
			var _item = $(this);
			var _svgItem = _item.svg();
			
			if(_svgItem.attr("selected") == undefined){
				_routes.each(function(){
					$(this).attr("opacity", 0.2);
				});
				
				_svgItem.removeAttr("opacity");
				_svgItem.attr("selected","true");
				
				processRoute(_item.attr("id"));
				
			}else{
				reset();
			}
		});
	});
}

function initStops(){
	var _stops = $('use[class="stop"]');
	_stops.each(function(){
		$(this).click(function(){
			//Add any functionality on click here
			var _item = $(this);
		});
	});
}

$(document).ready(function() {
	initStops();
	initRoutes();
});