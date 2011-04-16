var url = require('url');
var settings = require('../settings/settings');

exports.createServer = function(request, response) {
	var route = getControllerAndMethod(request.url);
	console.log(route);

	if(!route.foundMatch) {
		show404(response);
	}

	response.writeHead(200, { "Content-Type": "text/html" });
	response.write("hello world");
	response.end();
}

getControllerAndMethod = function(request_url) {
	pathname = url.parse(request_url).pathname.split('/');

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
}
