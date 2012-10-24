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

var svgMapElement; //Global variable pointing to the SVG map element

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

function initSvgVars(){
	//Set a global variable to point to the svg map.
	svgMapElement = $('#svg-map')[0];
	svgMapElement.setAttribute('viewBox', '0 0 300 300');
}

function initKeyboardListener(){

}

function initMouseListener(){

}

function zoom(step){
	//Get the viewbox values
	var viewBoxValues = svgMapElement.getAttribute('viewBox').split(' ');

	//Get the width and height of the viewbox as floats
	var width = parseFloat(viewBoxValues[2]);		
	var height = parseFloat(viewBoxValues[3]);

	var value = Math.abs(step);

	if(step < 0){
		viewBoxValues[2] = width * value;
		viewBoxValues[3] = height * value;
	} 
	else{
		viewBoxValues[2] = width / value;
		viewBoxValues[3] = height / value;
	}

	//Set the attribute to the new values
      	svgMapElement.setAttribute('viewBox', viewBoxValues.join(' '));
}

function pan(xStep, yStep){
	//Get the viewbox values
	var viewBoxValues = svgMapElement.getAttribute('viewBox').split(' ');

	//Get the width and height of the viewbox as floats
	var x = parseFloat(viewBoxValues[0]);		
	var y = parseFloat(viewBoxValues[1]);

	viewBoxValues[0] = x + xStep;
	viewBoxValues[1] = y + yStep;

	//Set the attribute to the new values
      	svgMapElement.setAttribute('viewBox', viewBoxValues.join(' '));
}

$(document).ready(function() {
	initStops();
	initRoutes();

	initSvgVars();
	initKeyboardListener();
	initMouseListener();
});
