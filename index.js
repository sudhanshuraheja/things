//
// Project Initialization
//

var sys = require('sys');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var settings = require('./settings');
settings.basepath = __dirname;


// Create a server
http.createServer(server).listen(settings.port, settings.hostname);

// Shout that you're up
sys.puts('Server is running at http://' + settings.hostname + ':' + settings.port);




//
// Server Code
//


// What does the server do
function server(request, response) {
	var req = url.parse(request.url);
	// Contains the controller and method
	var _params = utils.getRequestParams(req.pathname);
	
	// Contains the data which you pick up from the request
	var _getData = '';
	var _postData = '';
	
	// Contains associative arrays for get and post
	var _get = {};
	var _post = {};
	
	// If we're getting post data, there are two callbacks onData and onEnd
	if(request.method == 'POST') {
		
		// Closure for onData callback, write all data into a common variable
		var onDataCallback = function(partialData) {
			_postData += partialData;
		};
		request.on('data', onDataCallback);
		
		// Closure for onEnd callback, after this data is ready for processing
		var onEndCallback = function(end) {
			_getData = req.query;
			
			_get = utils.objectify(_getData);
			_post = utils.objectify(_postData);
			
			// Start page processing for post
			var controllerFile = settings.basepath + '/app/' + _params.controller + '.js';
			
			var controllerFilePostExistsCallback = function(exists) {
				if(!exists) {
					utils.show404(response);
				} else {
					var controllerClass = require(controllerFile);
					var output = controllerClass[_params.method]();
					utils.showData(response, output);
				}
			};
			path.exists(controllerFile, controllerFilePostExistsCallback);
		};
		request.on('end', onEndCallback);
		
	} else if(request.method == 'GET') {
		_getData = req.query;
		
		_get = utils.objectify(_getData);
		// Start page processing for get
		var controllerFile = settings.basepath + '/app/' + _params.controller + '.js';
		
		var controllerFileGetExistsCallback = function(exists) {
			if(!exists) {
				utils.show404(response);
			} else {
				var controllerClass = require(controllerFile);
				var output = controllerClass[_params.method]();
				utils.showData(response, output);
			}
		};
		path.exists(controllerFile, controllerFileGetExistsCallback);
	} else {
		console.log('Can\'t handle method : ' + request.method);
	}
};



//
// Utilities
//


// Utils for use throughout the application
var utils = {};

utils.show404 = function(response) {
	var data = { responseCode: 404, contentType: "text/html", html: JSON.stringify(settings.doc404) };
	utils.showData(response, data);
};

utils.showData = function(response, data) {
	var responseCode = data.responseCode ? data.responseCode : 200;
	var contentType = data.contentType ? data.contentType : "text/html";
	var html = data.html ? data.html : "+++";
	
	response.writeHead(responseCode, { "Content-Type": contentType });
	response.write(html);
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

utils.getRequestParams = function(pathname) {
	var ret = {};
	var parts = pathname.split('/');
	var actualCount = 0;
	for(i = 0; i < parts.length; i++) {
		if(parts[i] != '') {
			if(actualCount == 0)
				ret['controller'] = parts[i];
			else if(actualCount == 1)
				ret['method'] = parts[i];
			else
				ret['p' + actualCount] = parts[i];
			actualCount++;
		}
	}
	if(!ret.controller || (ret.controller == '')) ret.controller = 'home';
	if(!ret.method || (ret.method == '')) ret.method = 'base';
	return ret;
};


