var settings = require('../settings');
var utils = require('../utils');

exports.hello = function(_) {
	return { html: "<html><head><script src='/public/javascript/jquery-1.5.2.min.js'></script><script src='/public/javascript/jquery-1.5.3.min.js'></script></head><body>Hello<img src='/favicon.ico' /></body></html>"};
};

exports.base = function(_) {
	utils.log(_);
	return 'hello';
};