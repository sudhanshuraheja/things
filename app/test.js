var settings = require('../settings');
var utils = require('../utils');
var html = require('../html');

exports.hello = function(_) {
	return { html: html.page({}) };
};

exports.base = function(_) {
	utils.log(_);
	return 'hello';
};