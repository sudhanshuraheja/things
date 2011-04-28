//
// node88 - the client side js library
//

var node88 = {};

// Load Module - loads a particular file
// Developer needs to take care if the file has been loaded before or not
node88.loadModule = function(name) {
	node88.log('trying to load ' + name);
	$.getScript('/public/client/' + name + '.js', function() {
		node88.show(name + ' has been loaded into memory');
		window.modules[name].render();
	});
};

// The default log function (because console.log screws up in other browsers)
node88.log = function(message) {
	if(console.log) {
		console.log(message);
	}
};

// Write to the on-screen console
node88.show = function(message) {
	$('.console').html(message);
	node88.log(message);
};

// Callback for the hash change function
node88.windowHashChangeCallback = function(e) {
	var hash = location.hash.substring(3, location.hash.length);
	node88.log(hash);
	node88.show('Loading page ' + hash);
	
	// Based on which has you are on, decide what to do next
	var parts = hash.split('/');
	node88.router(parts);
};



//
// Router
// - Decides when which module is to be called
//
node88.router = function(request) {
	// Define your controller here
	// The controller decides the name of your file e.g. /public/client/xxx.js which gets called
	var controller = request[0] ? request[0] : 'home';
	
	// Don't change this
	// If the module isn't loaded, load the module, then call it's render function
	// If the module is loaded, call it's render function
	if(!window.modules[controller]) {
		node88.loadModule(controller);
	} else {
		node88.show(controller + ' is already loaded');
		window.modules[controller].render();
	}
};



//
// Other initialization sequences
//

// Prepare to track hash change
// http://benalman.com/code/projects/jquery-hashchange/docs/files/jquery-ba-hashchange-js.html

$(window).hashchange(node88.windowHashChangeCallback);

$(document).ready(function() {
	// Start tracking hash change after dom loads
	$(window).hashchange();
});

// Define modules
window.modules = {};