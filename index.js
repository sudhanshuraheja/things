var sys = require('sys');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var settings = {
	// The details about where the site is running
	hostname: 'localhost',
	port: 8080,

	// Set your basepath in settings, so that the rest of the system can use it
	basepath: __dirname,

	// database
	dbName: 'test',
	dbHost: 'localhost',
	dbPort: '27017',

	// The routes
	routes: [],

	// The html which gets rendered when a 404 is to be shown
	doc404: { error: { code: 404, description: "This url does not exist"}}
};

// Add the routes for your application
settings.routes.push(["/", [ "home", "base" ]]);
settings.routes.push(["/test/@", [ "test", "base" ]]);


// Create a server
http.createServer(server).listen(settings.port, settings.hostname);

// Shout that you're up
sys.puts('Server is running at http://' + settings.hostname + ':' + settings.port);



// What does the server do
function server(request, response) {
	var req = url.parse(request.url);
	var pathname = req.pathname;
	
	var _getData = '';
	var _postData = '';
	
	var _get = {};
	var _post = {};
	
	if(request.method == 'POST') {
		
		var onDataCallback = function(partialData) {
			_postData += partialData;
		};
		request.on('data', onDataCallback);
		
		var onEndCallback = function(end) {
			_getData = req.query;
			
			_get = utils.objectify(_getData);
			_post = utils.objectify(_postData);
			// Do whatever you want with post data
			console.log(_get);
			console.log(_post);
		};
		request.on('end', onEndCallback);
		
	} else if(request.method == 'GET') {
		_getData = req.query;
		
		_get = utils.objectify(_getData);
		// Do whatever you want with get data
		console.log(_get);
		
	} else {
		console.log('Can\'t handle method : ' + request.method);
	}
};


// Utils for use throughout the application
var utils = {};

utils.show404 = function(response) {
	response.writeHead(404, { "Content-Type": "text/html" });
	response.write(JSON.stringify(settings.doc404));
	response.end();
};

utils.objectify = function(data) {
	var ret = {};
	var parts = data.split('&');
	for(x in parts) {
		var keyvalue = parts[x].split('=');
		ret[keyvalue[0]] = keyvalue[1];
	}
	return ret;
};


