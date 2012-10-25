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
{"id":"stop-01","name":"Hamilton Zoo","next_arrivals":["Route 3 - 30min (4:50pm)"]},
{"id":"stop-02","name":"Wintec Avalon Drive","next_arrivals":["Orbitor - 10min (4:30pm)"]},
{"id":"stop-03","name":"The Base","next_arrivals":[]},
{"id":"stop-04","name":"Route 1 End","next_arrivals":[]},
{"id":"stop-05","name":"Rototuna Shops","next_arrivals":[]},
{"id":"stop-06","name":"Grandview Mall","next_arrivals":[]},
{"id":"stop-07","name":"Maeroa Intermediate","next_arrivals":[]},
{"id":"stop-08","name":"Beerscourt","next_arrivals":[]},
{"id":"stop-09","name":"Flagstaff Shops","next_arrivals":[]},
{"id":"stop-10","name":"Chartwell Shops","next_arrivals":[]},
{"id":"stop-11","name":"Route 8 End","next_arrivals":[]},
{"id":"stop-12","name":"Transport Centre","next_arrivals":[]},
{"id":"stop-13","name":"Fairfield High School","next_arrivals":[]},
{"id":"stop-14","name":"St. Pauls","next_arrivals":[]},
{"id":"stop-15","name":"Fairview Downs","next_arrivals":[]},
{"id":"stop-16","name":"Stop 16","next_arrivals":[]},
{"id":"stop-17","name":"Frankton","next_arrivals":[]},
{"id":"stop-18","name":"Claudelands","next_arrivals":[]},
{"id":"stop-19","name":"Wintec","next_arrivals":[]},
{"id":"stop-20","name":"Hamilton Boys High School","next_arrivals":[]},
{"id":"stop-21","name":"Fraser High School","next_arrivals":[]},
{"id":"stop-22","name":"Aberdeen Primary","next_arrivals":[]},
{"id":"stop-23","name":"Frankton Primary","next_arrivals":[]},
{"id":"stop-24","name":"Hamilton Police Station","next_arrivals":["Route 2 - 23min (4:43pm)","Route 10 - 5min (4:25pm)","Route 13 - 15min (4:35pm)","Route 17 - 27min (4:47pm)"]},
{"id":"stop-25","name":"Sacret Heart High School","next_arrivals":[]},
{"id":"stop-26","name":"Dinsdale Shops","next_arrivals":[]},
{"id":"stop-27","name":"Hospital","next_arrivals":[]},
{"id":"stop-28","name":"Stop 28","next_arrivals":[]},
{"id":"stop-29","name":"Hamilton Gardens","next_arrivals":[]},
{"id":"stop-30","name":"University of Waikato","next_arrivals":["Route 13 - 35min (4:55pm)","Orbitor - 10min (4:30pm)"]},
{"id":"stop-31","name":"Silverdale Shops","next_arrivals":["Route 13 - 35min (4:55pm)","Route 17 - 20min (4:40pm)","Orbitor - 2min (4:22pm)"]},
{"id":"stop-32","name":"Melville High School","next_arrivals":[]},
{"id":"stop-33","name":"Fitzroy Park","next_arrivals":[]},
{"id":"stop-34","name":"Silverdale Shops","next_arrivals":[]},
{"id":"stop-35","name":"Glenview Shopping Centre","next_arrivals":[]},
{"id":"stop-36","name":"Morrinsville Road","next_arrivals":[]},
{"id":"stop-37","name":"Route 6 End","next_arrivals":[]}
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
var currentZoomLevel;
var defaultZoomLevel; //Calculate in initSvgVars() at runtime.
var defaultPan = 20;
var defaultZoomIn = 0.8;
var defaultZoomOut = 1.25; //Because 1/0.8 = 1.25. Need both of these to be whole fractions so we dont loose precision.
var defaultViewBoxValue = '50 80 900 1100';
var zoomToBoundingBoxEnabled = true;

//Mouse panning global vars
var lastMouseEvent = null;
var mouseCurrentlyPanning = false;

function reset(){
	console.log("reset");
	$('#major-name').html('');
	$('#minor-name').html('');
	$('#content').html('');

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

	$('#major-name').html(_item.name);
	
	if(itemId == "route-13"){
		$("#route13stops").attr("display","all");
	}
	
	zoomToBoundingBox(itemId);
}

function processStop(itemId){
	console.log(itemId);
	var _item = $.grep(stopDetails, function(obj){
		return obj.id === itemId;
	})[0];

	$('#major-name').html(_item.name);
	$('#minor-name').html("Arrivals");
	
	var nextArrivals = "";
	
	$.each(_item.next_arrivals, function(index, arrival){
		nextArrivals += arrival + "</br>";
	});
	
	$('#content').html(nextArrivals);
}

function processMinorStop(itemId){
	var _item = $.grep(route13Stops, function(obj){
		return obj.id === itemId;
	})[0];

	$('#major-name').html("Route 13");
	$('#minor-name').html(_item.name);
	$('#content').html("Next arrival in 15mins (5:37pm)");
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
		$(this).hover(
			function(){
				var _item = $(this);
				processMinorStop(_item.attr("id"));
			},
			function(){
				$('#minor-name').html('');
				$('#content').html('');
			}
		)
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
	svgMapElement.setAttribute('viewBox', defaultViewBoxValue);
	defaultZoomLevel = parseFloat(defaultViewBoxValue.split(' ')[2]) / svgMapElement.getBBox().width;
	currentZoomLevel = defaultZoomLevel;
}

function initKeyboardListener(){
	window.addEventListener('keydown', handleKeyEvent, false);
	svgMapElement.addEventListener('keydown', handleKeyEvent, false);
}

function initMouseListener(){
	//Add listeners for mouse wheel
	if(navigator.userAgent.toLowerCase().indexOf('webkit') >= 0){
		//Chrome/Safari
		svgMapElement.addEventListener('mousewheel', handleMouseWheelEvent, false); 
	}
	else{
		//Others
		svgMapElement.addEventListener('DOMMouseScroll', handleMouseWheelEvent, false); 
	}
	
	//Add listeners for mouse up/down/move
	svgMapElement.addEventListener('mouseup', handleMouseUpEvent, false);
	svgMapElement.addEventListener('mousedown', handleMouseDownEvent, false);
	svgMapElement.addEventListener('mousemove', handleMouseMoveEvent, false);
}

function zoom(step){
	//Store the zoom level. This is used for mouse panning.
	currentZoomLevel *= step;

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
	//console.log("ViewBox X: " + viewBoxValues[0] + ". ViewBox Y: " + viewBoxValues[1]);

	//Set the attribute to the new values
	svgMapElement.setAttribute('viewBox', viewBoxValues.join(' '));
}

function zoomToBoundingBox(itemId){
	if(!zoomToBoundingBoxEnabled){
		return;
	}
	
	//Get the svg line from the id, then get the bounding box
	var boundingBox = $('#' + itemId)[0].getBBox();

	//Nothing wrong with a bit o padding
	var boudingBoxPadding = 50;
	
	//Store the zoom level. This is used for mouse panning.
	currentZoomLevel = (boundingBox.width + (2 * boudingBoxPadding)) / svgMapElement.getBBox().width;

	//Set the new viewBox to be slightly large than the bounding box
	var viewBoxValues = new Array();
	viewBoxValues[0] = boundingBox.x - boudingBoxPadding;
	viewBoxValues[1] = boundingBox.y - boudingBoxPadding;
	viewBoxValues[2] = boundingBox.width + (2 * boudingBoxPadding);
	viewBoxValues[3] = boundingBox.height + (2 * boudingBoxPadding);

	//Set the attribute to the new values
  svgMapElement.setAttribute('viewBox', viewBoxValues.join(' '));
}

function resetPanZoom(){
	svgMapElement.setAttribute('viewBox', defaultViewBoxValue);
	currentZoomLevel = defaultZoomLevel;
}

function handleKeyEvent(evt){
	//console.log(evt.keyCode);	

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
}

function handleMouseWheelEvent(evt) {
	//console.log("Mouse X: " + evt.clientX + ". Mouse Y: " + evt.clientY);
	var delta;

	//Normalise the zoom level. TODO: use this value to control zoom amount.
	if(evt.wheelDelta){
		//Chrome/Safari
		delta = evt.wheelDelta / 3600; 
	}
	else{
		//Mozilla
		delta = evt.detail / -90;
	}

	evt.preventDefault();
	zoom(delta > 0 ? defaultZoomIn : defaultZoomOut);

	return false;
}

function handleMouseMoveEvent(evt) {
	//console.log('Mouse move');
	if(mouseCurrentlyPanning){
		//Calculate the differnce in pixels since the last move event, then multiply by the zoom level to scale to the viewBox
		var xDiff = (lastMouseEvent.clientX - evt.clientX) * currentZoomLevel;
		var yDiff = (lastMouseEvent.clientY - evt.clientY) * currentZoomLevel;
	
		pan(xDiff,yDiff);
		lastMouseEvent = evt;
	}
}

function handleMouseDownEvent(evt) {
	//console.log('Mouse down');
	lastMouseEvent = evt;
	mouseCurrentlyPanning = true;
}

function handleMouseUpEvent(evt) {
	//console.log('Mouse up');
	lastMouseEvent = null;
	mouseCurrentlyPanning = false;
}

$(document).ready(function() {
	initStops();
	initRoutes();

	initSvgVars();
	initKeyboardListener();
	initMouseListener();
});
