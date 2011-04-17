var url = require('url');
var path = require('path');
var fs = require('fs');

var settings = require('../settings/settings');

var _response;
var _request;

var _route;

exports.createServer = function(request, response) {
	_response = response;
	_request = request;
	
	_route = getControllerAndMethod();
	console.log(_route);

	if(!_route.foundMatch) {
		show404(response);
	} else {
		// If _route.controller = 'public', then use the static file loader from /framework/static.js
		if(_route.controller == 'static') {
			path.exists(settings.basepath + url.parse(_request.url).pathname, loadStaticFile);
		} else {
			path.exists(settings.basepath + '/app/' + _route.controller + '.js', checkController);
		}
		//console.log('checking for ' + settings.basepath + '/app/' + route.controller + '.js');
	}
};

loadStaticFile = function(exists) {
	if(exists) {
		var filename = settings.basepath + url.parse(_request.url).pathname;
		fs.readFile(filename, "binary", function(err, file) {
					if(err) {
						show404(); return;
					}
					_response.writeHead(200, { "Content-Type": "text/plain" });
					_response.write(file, "binary");
					_response.end();
					});
	} else {
		show404();
	}
}

checkController = function(exists) {
	console.log(exists);
	if(exists) {
		req = url.parse(_request.url);
		
		// Require the controller
		var controller = require('../app/' + _route.controller);
		var method = _route.method;
		
		var data = controller[method];
		
		var responseCode = data.responseCode ? data.responseCode : 200;
		var contentType = data.contentType ? data.contentType : "text/html";
		var html = data.html ? data.html : 'No data sent';
		
		_response.writeHead(responseCode, { "Content-Type": contentType });
		_response.write(html);
		_response.end();		
	} else {
		show404();
	}
};

show404 = function() {
	_response.writeHead(404, { "Content-Type": "text/html" });
	_response.write(settings.doc404);
	_response.end();
};

getControllerAndMethod = function() {
	pathname = url.parse(_request.url).pathname.split('/');

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
