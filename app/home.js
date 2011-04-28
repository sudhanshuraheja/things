var settings = require('../settings');
var utils = require('../utils');
var html = require('../html');

//var mongo = require('mongodb');
//var db = new mongo.Db(settings.dbName, new mongo.Server(settings.dbHost, settings.dbPort, {}), {});

exports.base = function(_) {
	var data = {};
	data.title = 'Home';
	
	h = [];
	h.push("<link type='text/css' href='/public/style/88things.css' rel='stylesheet' />");
	h.push("<script src='/public/javascript/jquery.hashchange-1.3.js'></script>");
	h.push("<script src='/public/javascript/node88.js'></script>");
	data.head = h.join('');
	
	b = [];
	b.push("<div class='appmenu'>");
	b.push("	<ul class='appmenu-list clearfix'>");
	b.push("		<li class='appmenu-item-left '><a href='/#!/home'>Home</a></li>");
	b.push("		<li class='appmenu-item-right '><span class='console'></span></li>");
	b.push("	</ul>");
	b.push("</div>");
	b.push("<div class='menu'>");
	b.push("	<div class='contain clearfix'>");
	b.push("		<div class='title text-shadow-2 clearfix'>");
	b.push("			<h1 class='title-text'>" + settings.name + "</h1>");
	b.push("			<div class='subtitle'>" + settings.slogan + "</div>");
	b.push("		</div>");
	b.push("		<div class='menu-block'>");
	b.push("			<ul class='menu-list clearfix'>");
	b.push("				<li class='menu-item  menu-selected'><a href='/#!/home'>Home</a></li>");
	b.push("				<li style='box-shadow: none; -moz-box-shadow: none; -webkit-box-shadow: none;'>&nbsp; &nbsp; &nbsp; &nbsp;</li>");
	b.push("				<li class='menu-item '><a href='/#!/login'>Login</a></li>");
	b.push("				<li class='menu-item '><a href='/#!/register'>Sign Up</a></li>");
	b.push("			</ul>");
	b.push("		</div>");
	b.push("	</div>");
	b.push("</div>");
	b.push("<div class='contain clearfix'>");
	b.push("	Hello");
	b.push("</div>");
	data.body = b.join('');
	
	return { html: html.page(data) };
};

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
