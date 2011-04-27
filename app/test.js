var settings = require('../settings');
var utils = require('../utils');

exports.hello = function(_) {
	return { html: "<html><head><script src='/public/javascript/jquery.js'></script></head><body>Hello</body></html>"};
};

exports.base = function(_) {
	utils.log(_);
	return 'hello';
};