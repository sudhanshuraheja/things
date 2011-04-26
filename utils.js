var settings = require('./settings');
var path = require('path');
var fs = require('fs');

var utils = {};

utils.show404 = function(response) {
	var data = { responseCode: 404, contentType: "text/html", html: JSON.stringify(settings.doc404) };
	utils.showData(response, data);
};
exports.show404 = utils.show404;

utils.showData = function(response, data) {
	var responseCode = data.responseCode ? data.responseCode : 200;
	var contentType = data.contentType ? data.contentType : "text/html";
	var html = data.html ? data.html : "+++";
	var dataType = data.dataType ? data.dataType : '';
	
	response.writeHead(responseCode, { "Content-Type": contentType });
	if(dataType != '') {
		response.write(html, dataType);
	} else {
		response.write(html);
	}
	response.end();
};
exports.showData = utils.showData;

utils.showStatic = function(response, filepath) {
	filepath = settings.basepath + filepath;
	var fileExistsCallback = function(exists) {
		if(exists) {
			var staticReadFileCallback = function(err, file) {
				if(err) {
					utils.show404(response);
				} else {
					var output = { responseCode: 200, contentType: "text/plain",  dataType: "binary", html: file};
					utils.showData(response, output);
				}
			};
			fs.readFile(filepath, "binary", staticReadFileCallback);
		} else {
			utils.show404(response);
			utils.log(filepath + ' does not exist');
		}
	};
	path.exists(filepath, fileExistsCallback);
};
exports.showStatic = utils.showStatic;

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