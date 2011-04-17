var sys = require('sys');
var http = require('http');

var app = require('./framework/app');
var settings = require('./settings/settings');

// Set your basepath in settings, so that the rest of the system can use it
settings.basepath = __dirname;
settings.routes.push( [ "/favicon.ico", ["static"] ] );
settings.routes.push( [ "/public/images/@", ["static"] ] );
settings.routes.push( [ "/public/style/@", ["static"] ] );
settings.routes.push( [ "/public/javascript/@", ["static"] ] );


// create server
http.createServer(app.createServer)
	.listen(settings.port, settings.hostname);

// Shout that you're up
sys.puts('Server is running at http://' + settings.hostname + ':' + settings.port);
