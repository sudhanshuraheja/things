var things = {};

things.changeAppMenu = function(appmenu) {
	// Add the console to the right by default
	// appmenu = { left: [ "<a href=''>test</a>" ], right: [ "<a href=''>test</a>" ] }
	
	am = [];
	
	// Load values for left
	for(x in appmenu.left) {
		am.push('<li class="appmenu-item-left">' + appmenu.left[x] + '</li>');
	}
	
	// insert console first 
	var console_value = $('.console').html();
	am.push('<li class="appmenu-item-right"><span class="console">' + console_value + '</span></li>');
	
	// Load values for right
	for(x in appmenu.right) {
		am.push('<li class="appmenu-item-right">' + appmenu.left[x] + '</li>');
	}
	
	$('.appmenu-list').html(am.join(''));
};

things.changeTitle = function(title) {
	$('.title-text').html(title);
};

things.changeSubtitle = function(subtitle) {
	$('.subtitle').html(subtitle);
};

things.changeMenu = function(menu) {
	m = [];
	for(x in menu) {
		if(menu[x].selected) {
			m.push("<li class='menu-item menu-selected'>" + menu[x].selected + "</li>");
		} else if(menu[x].divider == true) {
			m.push("<li style='box-shadow: none; -moz-box-shadow: none; -webkit-box-shadow: none;'>&nbsp; &nbsp; &nbsp; &nbsp;</li>");
		} else {
			m.push("<li class='menu-item'>" + menu[x] + "</li>");
		}
	}
	
	$('.menu-list').html(m.join(''));
};

things.addCenterBox = function(obj) {
	b = [];
	
	if(!obj.title) obj.title = '';
	if(!obj.header) obj.header = {};
	if(!obj.body) obj.body = '';
	if(!obj.footer) obj.footer = '';
	
	b.push('<div class="content-box-center">');
	b.push('	<div class="content">');
	b.push('		<div class="content-header clearfix">');
	b.push('			<div class="content-header-title text-shadow-1">');
	b.push(					obj.title);
	b.push('			</div>');
	b.push('			<div class="content-header-menu">');
	b.push('				<ul class="clearfix">');
	for(x in obj.header) {
		b.push(					'<li>' + obj.header[x] + '</li>');
	}
	b.push('				</ul>');
	b.push('			</div>');
	b.push('		</div>');
	b.push('		<div class="content-body">');
	b.push(				obj.body);
	b.push('		</div>');
	b.push('	</div>');
	b.push('	<div class="footer">');
	b.push(			obj.footer);
	b.push('	</div>');
	b.push('</div>');
	
	$('.playground').html(b.join(''));
};

things.addMidBox = function(obj) {
	b = [];
	
	b.push('<div class="sidebar">');
	b.push('	<ul>');
	for(x in obj.sidebar) {
		if(obj.sidebar[x].head) {
			b.push('<li class="sidebar-head">' + obj.sidebar[x].head + '</li>');
		} else if(obj.sidebar[x].subhead) {
			b.push('<li class="sidebar-subhead">' + obj.sidebar[x].subhead + '</li>');
		} else if(obj.sidebar[x].item) {
			b.push('<li class="sidebar-item">' + obj.sidebar[x].item + '</li>');
		} else {
			b.push('<li>' + obj.sidebar[x] + '</li>');
		}
	}
	b.push('	</ul>');
	b.push('</div>');
	b.push('<div class="content-box">');
	b.push('	<div class="content">');
	b.push('		<div class="content-header clearfix">');
	b.push('			<div class="content-header-title text-shadow-1">');
	b.push(					obj.title);
	b.push('			</div>');
	b.push('			<div class="content-header-menu">');
	b.push('				<ul class="clearfix">');
	for(x in obj.header) {
		b.push(					'<li>' + obj.header[x] + '</li>');
	}
	b.push('				</ul>');
	b.push('			</div>');
	b.push('		</div>');
	b.push('		<div class="content-body">');
	b.push(				obj.body);
	b.push('		</div>');
	b.push('	</div>');
	b.push('	<div class="footer">');
	b.push(			obj.footer);
	b.push('	</div>');
	b.push('</div>');
	
	$('.playground').html(b.join(''));
};

things.addFullBox = function(obj) {
	b = [];
	
	if(!obj.title) obj.title = '';
	if(!obj.header) obj.header = {};
	if(!obj.body) obj.body = '';
	if(!obj.footer) obj.footer = '';
	
	b.push('<div class="content-box-full">');
	b.push('	<div class="content">');
	b.push('		<div class="content-header clearfix">');
	b.push('			<div class="content-header-title text-shadow-1">');
	b.push(					obj.title);
	b.push('			</div>');
	b.push('			<div class="content-header-menu">');
	b.push('				<ul class="clearfix">');
	for(x in obj.header) {
		b.push(					'<li>' + obj.header[x] + '</li>');
	}
	b.push('				</ul>');
	b.push('			</div>');
	b.push('		</div>');
	b.push('		<div class="content-body">');
	b.push(				obj.body);
	b.push('		</div>');
	b.push('	</div>');
	b.push('	<div class="footer">');
	b.push(			obj.footer);
	b.push('	</div>');
	b.push('</div>');
	
	$('.playground').html(b.join(''));
};

things.footer = function() {
	f = [];
	
	f.push("Created by <a href=''>Vercingetorix Technologies</a> | ");
	f.push("<a href=''>Terms of Service</a> | ");
	f.push("<a href=''>Privacy Policy</a> | ");
	f.push("<a href=''><b>Support</b></a> | ");
	f.push("<a href=''>Register</a> | ");
	f.push("&copy; 2011 All Rights Reserved<br /> ");
	f.push("Design inspired from the amazing products made by <a href='http://37signals.com'>37signals</a><br />");
	
	return f.join('');
};


// Form elements
things.text = function(obj) {
	
	if(!obj.title) obj.title = 'please_pass_the_title';
	if(!obj.subtitle) obj.subtitle = '';
	if(!obj.id) obj.id = 'enter_some_id';
	if(!obj.classes) obj.classes = '';
	if(!obj.value) obj.value = '';

	f = [];
	
	f.push("<label class='form-label' for='" + obj.id + "'>");
	f.push("	" + obj.title + "<br />");
	f.push("	<small>" + obj.subtitle + "</small>");
	f.push("</label><br />");
	f.push("<input class='form-input " + obj.classes + "' type='text' name='" + obj.id + "' id='" + obj.id + "' value='" + obj.value + "' /><br />");
	
	return f.join('');
};

things.submit = function(obj) {
	
	if(!obj.value) obj.value = 'please_enter_a_value';
	if(!obj.cancel) obj.cancel = '/#!/home';
	
	f = [];
	
	f.push("<br />");
	f.push("<input class='button form-submit' type='submit' name='submit' id='submit' value='" + obj.value + "' />");
	f.push("or <a class='form-cancel' href='" + obj.cancel + "'>Cancel</a>");
	
	return f.join('');
};

things.hidden = function(obj) {

	if(!obj.name) obj.name = 'method';
	if(!obj.value) obj.value = 'please_enter_a_value';

	return "<input type='hidden' name='" + obj.name + "' value='" + obj.value + "' />";
};

things.form = function(obj) {
	
	if(!obj.data) obj.data = '';
	if(!obj.method) obj.method = 'GET';
	if(!obj.action) obj.action = '';
	if(!obj.id) obj.id = 'please_enter_a_id';
	
	f = [];
	f.push("<form method='" + obj.method + "' action='" + obj.action + "' id='" + obj.id + "'>");
	f.push(obj.data);
	f.push("</form>");
	
	return f.join('');
};

 




