var settings = require('./settings');
var path = require('path');
var fs = require('fs');

var utils = {};

// Call to show the 404 page
utils.show404 = function(request, response) {
	if(settings.isFullApp && (settings.html404 != '')) {
		filepath = settings.basepath + settings.html404;
		var show404PathExistsCallback = function(exists) {
			if(exists) {
				var show404ReadFileCallback = function(err, file) {
					if(err) {
						utils.log(err);
						var data = { responseCode: 404, contentType: "text/html", html: JSON.stringify(settings.doc404) };
						utils.showData(request, response, data);
					} else {
						var data = { responseCode: 404, contentType: "text/html", html: file };
						utils.showData(request, response, data);
					}
				};
				fs.readFile(filepath, "binary", show404ReadFileCallback);
			} else {
				var data = { responseCode: 404, contentType: "text/html", html: JSON.stringify(settings.doc404) };
				utils.showData(request, response, data);				
			}
		};
		path.exists(filepath, show404PathExistsCallback);
	} else {
		var data = { responseCode: 404, contentType: "text/html", html: JSON.stringify(settings.doc404) };
		utils.showData(request, response, data);
	}
};
exports.show404 = utils.show404;

// Call to show any kind of data
utils.showData = function(request, response, data) {
	var responseCode = data.responseCode ? data.responseCode : 200;
	var contentType = data.contentType ? data.contentType : "text/html";
	var html = data.html ? data.html : "+++";
	var dataType = data.dataType ? data.dataType : '';
	var headers = data.headers ? data.headers : {};
	var lastModified = data.lastModified ? data.lastModified : '';
	
	if((lastModified != '') && (Date.parse(lastModified) <= Date.parse(request.headers['if-modified-since']))) {
		responseCode = 304;
	}
	
	if(!headers["Content-Type"]) {
		headers["Content-Type"] = contentType;
	}
	
	if(!headers["Content-Length"]) {
		headers["Content-Length"] = html.length;
	}
	
	if(!headers["Server"]) {
		headers["Server"] = "node88/0.0.1";
	}
	
	if(!headers["Date"]) {
		var dt = new Date();
		headers["Date"] = dt.toGMTString();
	}
	
	if(!headers["Expires"]) {
		var dt = new Date();
		dt.setTime(dt.getTime() + (119 * 1000));
		headers["Expires"] = dt.toGMTString();
	}
	
	if(!headers["Cache-control"]) {
		headers["Cache-control"] = 'public, max-age=120';
	}
	
	if(!headers["Last-Modified"]) {
		if(lastModified != '') {
			var dt = new Date();
			dt.setTime(Date.parse(lastModified));
			headers["Last-Modified"] = dt.toGMTString();
		} else {
			var dt = new Date();
			headers["Last-Modified"] = dt.toGMTString();
		}
	}
	
	response.writeHead(responseCode, headers);

	if(responseCode == 304) {
		// Do nothing
	} else if(dataType != '') {
		response.write(html, dataType);
	} else {
		response.write(html);
	}
	response.end();
};
exports.showData = utils.showData;

utils.getRFC1123Date = function() {
	// Thu, 28 Apr 2011 05:05:32 GMT
};

// Show all the static files
utils.showStatic = function(request, response, filepath) {
	filepath = settings.basepath + filepath;
	var fileExistsCallback = function(exists) {
		if(exists) {
			var staticReadFileCallback = function(err, file) {
				if(err) {
					utils.show404(request, response);
				} else {
					var staticFileStatCallback = function(err, stats) {
						if(err) {
							utils.log(err);
						} else {
							//utils.log(stats);
							//utils.log(Date.parse(stats.mtime));
							//utils.log(Date.parse(stats.mtime).toUTCString());
							
							var contentType = utils.getFileContentType(filepath);
							var output = { responseCode: 200, contentType: contentType,  dataType: "binary", html: file, lastModified: stats.mtime };
							utils.showData(request, response, output);
						}
					};
					fs.stat(filepath, staticFileStatCallback);					
				}
			};
			fs.readFile(filepath, "binary", staticReadFileCallback);
		} else {
			utils.show404(request, response);
			utils.log(filepath + ' does not exist');
		}
	};
	path.exists(filepath, fileExistsCallback);
};
exports.showStatic = utils.showStatic;

// Get the content-type header to be sent
utils.getFileContentType = function(url) {
	var parts = url.split('.');
	var extension = parts[parts.length - 1].toLowerCase();
	
	var contentTypes = {
		'': 'text/plain',
		'js': 'application/javascript',
		'gif': 'image/gif',
		'png': 'image/png',
		'css': 'text/css',
		'ico': 'image/x-icon',
		'html': 'text/html',
		'jpeg': 'image/jpeg',
		'jpg': 'image/jpeg',
		'json': 'application/json',
		'svg': 'image/svg+xml',
		'swf': 'application/x-shockwave-flash',
		'tar': 'application/x-tar',
		'tgz': 'application/x-tar-gz',
		'txt': 'text/plain',
		'wav': 'audio/x-wav',
		'xml': 'text/xml',
		'zip': 'application/zip',
		'flv': 'video/x-flv'
	};
	
	var ret = contentTypes[extension];
	return ret ? ret : 'text/plain';
};
exports.getFileContentType = utils.getFileContentType;

// Break the get and post values received into associate arrays
utils.objectify = function(data) {
	var ret = {};
	if(data) {
		var parts = data.split('&');
		for(x in parts) {
			var keyvalue = parts[x].split('=');
			ret[keyvalue[0]] = keyvalue[1];
		}
	}
	return ret;
};
exports.objectify = utils.objectify;

// Break the request into an associative array
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
exports.getRequestParams = utils.getRequestParams;

// Default log function
utils.log = function(message, logType) {
	logType = logType || '----';
	var dt = new Date();

	if(typeof(message) == 'object') {
		console.log('[' + dt.getTime() + '][' + logType + ']');
		console.log(message);
	} else {
		console.log('[' + dt.getTime() + '][' + logType + '] ' + message);
	}
};
exports.log = utils.log;

//utils.mongo = require('mongodb');
//exports.mongo = utils.mongo;

//var mongo = require('mongodb');
//var db = new mongo.Db(settings.dbName, new mongo.Server(settings.dbHost, settings.dbPort, {}), {});

/*
 db.open(function() {
 console.log('database opened');
 db.collection('foo', function(err, collection) {
 doc = { 'a': 2 };
 console.log('collection initialized');
 collection.insert(doc, function() {
 console.log('doc inserted');
 });
 });
 });*/
