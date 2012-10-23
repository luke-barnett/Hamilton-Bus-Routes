function initRoutes(){
	var _routes = $('path[class="route"]');
	_routes.each(function(){
		$(this).click(function(){
			//Add any functionality on click here
			var _item = $(this);
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