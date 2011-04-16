exports.hostname = 'localhost';
exports.port = 8080;
exports.basepath = '';

exports.routes = [
	[ "/favicon.ico",
		["public", "images"] ],
	[ "/test/@",
		["test", "base"] ]
];

exports.doc404 = "<div style='width: 600px; margin: 150px auto; text-align: center; background-color: #F7F7F7; border: 10px solid #EEEEEE; padding: 40px 0px; font-family: Georgia; Arial, sans-serif;'>This page does not exist</div><div style='display: none;'><div style='width: 600px; margin: 150px auto; text-align: center; background-color: #F7F7F7; border: 10px solid #EEEEEE; padding: 40px 0px; font-family: Georgia; Arial, sans-serif;'>Chrome does not show your error page if the content size is lesser than 512 bytes, hence we have had to take this extreme step.</div><div style='width: 600px; margin: 150px auto; text-align: center; background-color: #F7F7F7; border: 10px solid #EEEEEE; padding: 40px 0px; font-family: Georgia; Arial, sans-serif;'>This page really does not exist</div></div>";
