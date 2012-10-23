function initRoutes(){
	var _routes = $('path[id|="route"]');
	_routes.each(function(){
		$(this).click(function(){
			var _item = $(this);
		});
	});
}

function initStops(){
	var _routes = $('path[id|="stop"]');
	_routes.each(function(){
		$(this).click(function(){
			var _item = $(this);
		});
	});
}

$(document).ready(function() {
	initStops();
	initRoutes();
});