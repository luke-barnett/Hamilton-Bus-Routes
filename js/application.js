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

var route13Stops =
[
{"id":"stop13_1","name":"2 Collingwood St"},
{"id":"stop13_2","name":"206 Victoria St"},
{"id":"stop13_3","name":"669 Grey St"},
{"id":"stop13_4","name":"29 Te Aroha St"},
{"id":"stop13_5","name":"Opp 92 Te Aroha St"},
{"id":"stop13_6","name":"108 Peachgrove Rd"},
{"id":"stop13_7","name":"21 Wilson St"},
{"id":"stop13_8","name":"Opp 118 Old Farm Rd"},
{"id":"stop13_9","name":"44 Cameron Rd"},
{"id":"stop13_10","name":"6 Greensboro St"}

var stopDetails =
[
{"id":"stop-01","name":"Stop 1"},
{"id":"stop-02","name":"Stop 2"},
{"id":"stop-03","name":"Stop 3"},
{"id":"stop-04","name":"Stop 4"},
{"id":"stop-05","name":"Stop 5"},
{"id":"stop-06","name":"Stop 6"},
{"id":"stop-07","name":"Stop 7"},
{"id":"stop-08","name":"Stop 8"},
{"id":"stop-09","name":"Stop 9"},
{"id":"stop-10","name":"Stop 10"},
{"id":"stop-11","name":"Stop 11"},
{"id":"stop-12","name":"Transport Centre"},
{"id":"stop-13","name":"Stop 13"},
{"id":"stop-14","name":"Stop 14"},
{"id":"stop-15","name":"Stop 15"},
{"id":"stop-16","name":"Stop 16"},
{"id":"stop-17","name":"Stop 17"},
{"id":"stop-18","name":"Stop 18"},
{"id":"stop-19","name":"Stop 19"},
{"id":"stop-20","name":"Stop 20"},
{"id":"stop-21","name":"Stop 21"},
{"id":"stop-22","name":"Stop 22"},
{"id":"stop-23","name":"Stop 23"},
{"id":"stop-24","name":"Stop 24"},
{"id":"stop-25","name":"Stop 25"},
{"id":"stop-26","name":"Stop 26"},
{"id":"stop-27","name":"Stop 27"},
{"id":"stop-28","name":"Stop 28"},
{"id":"stop-29","name":"Stop 29"},
{"id":"stop-30","name":"Stop 30"},
{"id":"stop-31","name":"Stop 31"},
{"id":"stop-32","name":"Stop 32"},
{"id":"stop-33","name":"Stop 33"},
{"id":"stop-34","name":"Stop 34"},
{"id":"stop-35","name":"Stop 35"},
{"id":"stop-36","name":"Stop 36"},
{"id":"stop-37","name":"Stop 37"}
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

function processStop(itemId){
	console.log(itemId);
	var _item = $.grep(stopDetails, function(obj){
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

function panVertical(upDirection){
	var svg = $("map");
}

function initStops(){
	var _stops = $('use[class="stop"]');
	_stops.each(function(){
		$(this).click(function(){
			//Add any functionality on click here
			var _item = $(this);


			processStop(_item.attr("id"));
		});
	});
}

$(document).ready(function() {
	initStops();
	initRoutes();
});
