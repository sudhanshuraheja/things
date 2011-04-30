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
	
	$('.contain').html(b.join(''));
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
	
	$('.contain').html(b.join(''));
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
	
	$('.contain').html(b.join(''));
};


