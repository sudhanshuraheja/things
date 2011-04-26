var settings = require('../settings');
var utils = require('../utils');

var mongo = require('mongodb');
var db = new mongo.Db(settings.dbName, new mongo.Server(settings.dbHost, settings.dbPort, {}), {});

exports.base = function() {
	utils.log('in home');
	return 'home-base';
	/*db.open(function() {
			console.log('database opened');
			db.collection('foo', function(err, collection) {
						  doc = { 'a': 2 };
						  console.log('collection initialized');
						  collection.insert(doc, function() {
											console.log('doc inserted');
											});
						  });
			});*/
};