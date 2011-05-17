var home = {};

home.render = function() {
	
	things.changeAppMenu({
		left: [
			"<a href='/#!/home'>Home</a>",
			"<a href='/#!/login'>Login</a>"
		]
	});
	
	things.changeMenu([
		{ selected: "<a href='/#!/home'>Home</a>" },
		{ divider: true },
		"<a href='/#!/login'>Login</a>",
		"<a href='/#!/register'>Register</a>"
	]);

	things.addFullBox({
		title: "Home",
		header: [],
		body: "Loading...",
		footer: things.footer()
	});
};

window.modules.home = home;