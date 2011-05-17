var login = {};

login.render = function() {
	
	things.changeAppMenu({
		left: [
			"<a href='/#!/home'>Home</a>",
			"<a href='/#!/login'>Login</a>"
		]
	});
	
	things.changeMenu([
		"<a href='/#!/home'>Home</a>",
		{ divider: true },
		{ selected: "<a href='/#!/login'>Login</a>" },
		"<a href='/#!/register'>Register</a>"
	]);
	
	
	var b = [];
	
	b.push(things.text({ 
		title: 'Enter your email address', 
		subtitle: 'The email address that you entered while registering is also your username.', 
		id: 'email'
	}));
	
	b.push(things.text({ 
		title: 'Enter your password', 
		subtitle: 'If you can\'t remember your password, click <a href="/#!/forgot">here</a> to reset it', 
		id: 'password' 
	}));
	
	b.push(things.submit({ 
		value: 'Log Me In', 
		cancel: '/#!/home' 
	}));
						 
	b.push(things.hidden({ 
		name: 'method', 
		value: 'things.login' 
	}));
	
	var body = things.form({ method: 'POST', id: 'things-login', data: b.join('') });
	
	
	
	things.addCenterBox({
		title: "Login",
		header: [ "Don't have an account?", "<a href='/#!/register' class='button'>+ Register</a>" ],
		body: body,
		footer: things.footer()
	});
	
};

window.modules.login = login;