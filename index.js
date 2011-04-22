var sys = require('sys');
var http = require('http');
var url = require('url');

var app = require('./framework/app');
var settings = require('./settings/settings');

// Set your basepath in settings, so that the rest of the system can use it
settings.basepath = __dirname;

// Set the default route for images, stylesheets and javascript
settings.routes.push( [ "/favicon.ico", ["static"] ] );
settings.routes.push( [ "/public/images/@", ["static"] ] );
settings.routes.push( [ "/public/style/@", ["static"] ] );
settings.routes.push( [ "/public/javascript/@", ["static"] ] );


// create server
http.createServer(app.createServer)
	.listen(settings.port, settings.hostname);

// Shout that you're up
sys.puts('Server is running at http://' + settings.hostname + ':' + settings.port);

var path = require('path');
var fs = require('fs');

var settings = require('../settings/settings');

var _response;
var _request;

var _route;

exports.createServer = function(request, response) {
	console.log(':: Creating Server');
	
	_response = response;
	_request = request;
	
	_route = getControllerAndMethod();
	//console.log(_route);

	if(!_route.foundMatch) {
		console.log('No route was matched for ' + url.parse(_request.url).pathname);
		show404(response);
	} else {
		// If _route.controller = 'public', then use the static file loader from /framework/static.js
		if(_route.controller == 'static') {
			console.log(':: Loading static file for ' + settings.basepath + url.parse(_request.url).pathname);
			path.exists(settings.basepath + url.parse(_request.url).pathname, loadStaticFile);
		} else {
			console.log(':: In Loading controller for ' + _route.controller);
			path.exists(settings.basepath + '/app/controllers/' + _route.controller + '.js', checkController);
		}
		//console.log('checking for ' + settings.basepath + '/app/' + route.controller + '.js');
	}
};

loadStaticFile = function(exists) {
	console.log(':: In Loading static file for ' + settings.basepath + url.parse(_request.url).pathname);
	if(exists) {
		var filename = settings.basepath + url.parse(_request.url).pathname;
		console.log(':: Reading static file ' + filename);
		fs.readFile(filename, "binary", function(err, file) {
					console.log(':: Read static file');
					
					if(err) {
						show404(); return;
					}
					
					_response.writeHead(200);
					_response.write(file, "binary");
					_response.end();
					});
	} else {
		console.log('The file "' + settings.basepath + url.parse(_request.url).pathname + '" was not found');
		show404();
	}
}

checkController = function(exists) {
	console.log(':: In Loading controller for ' + _route.controller);
	//console.log(exists);
	if(exists) {
		req = url.parse(_request.url);
		
		// Require the controller
		var controller = require('../app/controllers/' + _route.controller);
		var method = _route.method;
		
		var data = controller[method]();
		// console.log('data >' + data + '<');
		
		var responseCode = ( data && data.responseCode ) ? data.responseCode : 200;
		var contentType = ( data && data.contentType ) ? data.contentType : "text/html";
		var html = ( data && data.html ) ? data.html : 'No data sent';
		
		_response.writeHead(responseCode, { "Content-Type": contentType });
		_response.write(html);
		_response.end();	
	} else {
		console.log('ERROR: The file for route ' + _route.controller + '.' + _route.method + '() does not exist');
		show404();
	}
};

show404 = function() {
	console.log(':: Going to show 404');
	_response.writeHead(404, { "Content-Type": "text/html" });
	_response.write(settings.doc404);
	_response.end();
};

getControllerAndMethod = function() {
	pathname = url.parse(_request.url).pathname.split('/');
	//console.log(pathname);

	var controller = '';
	var method = '';

	var foundMatch = true;
	for(x in settings.routes) {
		if(controller.length == 0) {
			foundMatch = true;
			var route = settings.routes[x][0].split('/');

			//console.log('    Matching ' + route.join('/') + ' and ' + pathname.join('/'));
			// Match route
			for(y in route) {
				if( (route[y] != '@') && (route[y] != pathname[y])) {
					foundMatch = false;
				}
			}

			if(foundMatch) {
				//console.log('Matched ' + settings.routes[x]);
				controller = settings.routes[x][1][0];
				method = settings.routes[x][1][1];
			}
		}
	}

	return { "foundMatch": foundMatch, "controller": controller, "method": method };
};

