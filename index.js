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

var utils = require('./utils');

// Create a server
http.createServer(server).listen(settings.port, settings.hostname);


// Shout that you're up
utils.log('Server is running at http://' + settings.hostname + ':' + settings.port, 'INFO');





//
// Server Code
//


// What does the server do
function server(request, response) {
	utils.log(request.url, 'INFO');
	var req = url.parse(request.url);
	// Contains the controller and method
	var _params = utils.getRequestParams(req.pathname);
	
	// Contains the data which you pick up from the request
	var _getData = '';
	var _postData = '';
	
	// Contains associative arrays for get and post
	var _get = {};
	var _post = {};
	
	var _global = {};
	
	// Check if we are being requested for a static file
	// 1. /favicon.ico
	// 2. /public/style/*
	// 3. /public/javascript/*
	// 4. /public/images/*
	if(
	   (request.url.indexOf('/public/icons/') == 0) ||
	   (request.url.indexOf('/public/style/') == 0) ||
	   (request.url.indexOf('/public/javascript/') == 0) ||
	   (request.url.indexOf('/public/images/') == 0) ||
	   (request.url.indexOf('/public/client/') == 0)
	) {
		utils.showStatic(request, response, req.pathname);
	} else {
		
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
				
				_global = { get: _get, post: _post, params: _params };
				
				// Start page processing for post
				var controllerFile = settings.basepath + '/app/' + _params.controller + '.js';
				
				var controllerFilePostExistsCallback = function(exists) {
					if(!exists) {
						utils.show404(request, response);
					} else {
						var controllerClass = require(controllerFile);
						if(controllerClass[_params.method]) {
							var output = controllerClass[_params.method](_global);
							utils.showData(request, response, output);
						} else {
							utils.show404(request, response);						
						}
					}
				};
				path.exists(controllerFile, controllerFilePostExistsCallback);
			};
			request.on('end', onEndCallback);
			
		} else if(request.method == 'GET') {
			_getData = req.query;
			
			_get = utils.objectify(_getData);
			
			_global = { get: _get, post: _post, params: _params };
			
			// Start page processing for get
			var controllerFile = settings.basepath + '/app/' + _params.controller + '.js';
			
			var controllerFileGetExistsCallback = function(exists) {
				if(!exists) {
					utils.show404(request, response);
				} else {
					var controllerClass = require(controllerFile);
					if(controllerClass[_params.method]) {
						var output = controllerClass[_params.method](_global);
						utils.showData(request, response, output);					
					} else {
						utils.show404(request, response);
					}
				}
			};
			path.exists(controllerFile, controllerFileGetExistsCallback);
		} else {
			utils.log('Can\'t handle method : ' + request.method, 'ERRO');
		}		
	}
	
};

