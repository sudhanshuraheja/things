var home = {};

home.render = function() {
	var test = store.get('test');
	node88.log(test);
	
	if(!test) {
		store.add('test', 'value');
	}
};

window.modules.home = home;