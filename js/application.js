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
]

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

//KeyCode Constants
var leftArrowKey = 37;
var upArrowKey = 38;
var rightArrowKey = 39;
var downArrowKey = 40;
var pageUpKey = 33;
var pageDownKey = 34;
var plusKey = 187;
var minusKey = 189;
var numPlusKey = 107;
var numMinusKey = 109;

//Panning and zooming constants
var defaultPan = 20;
var defaultZoomIn = 0.8;
var defaultZoomOut = 1.2;

function reset(){
	console.log("reset");
	$("#sidebar").empty();

	
	resetRoutes();
	resetStops();
	
}

function resetRoutes(){
	$('.route').each(function(){
		var _item = $(this);
		_item.svg().removeClass("unselected-route");
		_item.svg().removeClass("selected-route");
	});
	$("#route13stops").attr("display","none");
}

function resetStops(){
	$('.stop').each(function(){
		var _item = $(this);
		_item.svg().removeClass("selected-stop");
	});
}

function processRoute(itemId){
	var _item = $.grep(routeDetails, function(obj){
		return obj.id === itemId;
	})[0];

	var _sidebar = $("#sidebar");

	_sidebar.empty();
	_sidebar.append($("<h1>").append(_item.name));
	
	if(itemId == "route-13"){
		$("#route13stops").attr("display","all");
	}
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

function processMinorStop(itemId){
	var _item = $.grep(route13Stops, function(obj){
		return obj.id === itemId;
	})[0];

	var _sidebar = $("#sidebar");

	_sidebar.empty();
	_sidebar.append($("<h1>").append(_item.name));
}

function initRoutes(){
	var _routes = $('.route');
	_routes.each(function(){
		$(this).click(function(){
			//Add any functionality on click here
			var _item = $(this);
			
			if(_item.svg().hasClass("selected-route")){
				reset();
			}else{
				reset();
				_routes.each(function(){
					$(this).svg().removeClass("selected-route");
					$(this).svg().addClass("unselected-route")
				});
				
				
				_item.svg().removeClass("unselected-route");
				_item.svg().addClass("selected-route");
				processRoute(_item.attr("id"));

			}
		});
	});
	
	var _route13stops = $('.route13stop');
	_route13stops.each(function(){
		$(this).click(function(){
			var _item = $(this);
			
			processMinorStop(_item.attr("id"));
		})
	});
}

function initStops(){
	var _stops = $('.stop');
	_stops.each(function(){
		$(this).click(function(){
			//Add any functionality on click here
			var _item = $(this);
			
			if(_item.svg().hasClass("selected-stop")){
				reset();
			}else{
				_stops.each(function(){
					$(this).svg().removeClass("selected-stop");
				});
				
				resetRoutes();
				_item.svg().addClass("selected-stop");
				processStop(_item.attr("id"));
			}
			
		});
	});
}

function initSvgVars(){
	//Set a global variable to point to the svg map.
	svgMapElement = $('#svg-map')[0];
	svgMapElement.setAttribute('viewBox', '0 0 900 1100');
}

function initKeyboardListener(){
	window.addEventListener('keydown', handleKeyEvent, false);
	svgMapElement.addEventListener('keydown', handleKeyEvent, false);
}

function initMouseListener(){

}

function zoom(step){
	//Get the viewbox values
	var viewBoxValues = svgMapElement.getAttribute('viewBox').split(' ');

	//Get the width and height of the viewbox as floats
	var x = parseFloat(viewBoxValues[0]);		
	var y = parseFloat(viewBoxValues[1]);
	var width = parseFloat(viewBoxValues[2]);		
	var height = parseFloat(viewBoxValues[3]);
	
	//Calculate the new width and height
	var newWidth = width * step;
	var newHeight = height * step;

	viewBoxValues[0] = x + ((width - newWidth) / 2);
	viewBoxValues[1] = y + ((height - newHeight) / 2);
	viewBoxValues[2] = newWidth;
	viewBoxValues[3] = newHeight;

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

function handleKeyEvent(evt){
	switch (evt.keyCode)
	{
		case leftArrowKey:
			pan(-1 * defaultPan,0);
			evt.preventDefault();
			return false;
		break;
		case rightArrowKey:
			pan(defaultPan,0);
			evt.preventDefault();
			return false;
		break;
		case upArrowKey:
			pan(0, -1 * defaultPan);
			evt.preventDefault();
			return false;
		break;
		case downArrowKey:
      			pan(0, defaultPan);
			evt.preventDefault();
			return false;
		break;   
		case pageUpKey:
		case plusKey:
		case numPlusKey:                      
			zoom(defaultZoomIn);
			evt.preventDefault();
			return false;
		break;
		case pageDownKey:
		case minusKey:
		case numMinusKey:                      
			zoom(defaultZoomOut);
			evt.preventDefault();
			return false;
		break;
	}
	
	//console.log(evt.keyCode);	
}

$(document).ready(function() {
	initStops();
	initRoutes();

	initSvgVars();
	initKeyboardListener();
	initMouseListener();
});
