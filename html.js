var html = {};

html.page = function(obj) {
	
	var title = obj.title ? obj.title : 'Page Title';
	var description = obj.description ? obj.description : false;
	var author = obj.author ? obj.author : false;
	var favicon = obj.favicon ? obj.favicon : '/public/icons/favicon.ico';
	var appleTouchIcon = obj.appleTouchIcon ? obj.appleTouchIcon : '/public/icons/apple-touch-icon.png';
	var analyticsId = obj.analyticsId ? obj.analyticsId : false;
	
	var h = [];
	
	h.push('<!doctype html>');
	h.push('<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->');
	h.push('<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->');
	h.push('<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->');
	h.push('<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->');
	h.push('<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->');
	h.push('	<head>');
	h.push('		<meta charset="UTF-8">');
	h.push('		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">');
	h.push('		<title>' + title + '</title>');
	
	if(description) {
		h.push('		<meta name="description" content="' + description + '">');
	}
	
	if(author) {
		h.push('		<meta name="author" content="' + author + '">');
	}
	
	h.push('		<meta name="viewport" content="width=device-width, initial-scale=1.0">');
	h.push('		<link rel="shortcut icon" href="' + favicon + '">');
	h.push('		<link rel="apple-touch-icon" href="' + appleTouchIcon + '">');
	h.push('		<link rel="stylesheet" href="/public/style/style.css">');
	h.push('		<link rel="stylesheet" media="handheld" href="/public/style/handheld.css">');
	h.push('		<script src="/public/javascript/modernizr-1.7.min.js"></script>');
	h.push('		<script src="/public/javascript/jquery-1.5.2.min.js"></script>');
	h.push('	</head>');
	h.push('	<body>');
	h.push('		<div id="container">');
	h.push('		</div>');
	h.push("		<!--[if lt IE 7 ]>");
	h.push("			<script src='/public/javascript/dd_belatedpng.js'></script>");
	h.push("			<script> DD_belatedPNG.fix('img, .png_bg');</script>");
	h.push("		<![endif]-->");
	
	if(analyticsId) {
		h.push("		<script>");
		h.push("			var _gaq=[['_setAccount','" + analyticsId + "'],['_trackPageview']];");
		h.push("			(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;");
		h.push("				g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';");
		h.push("				s.parentNode.insertBefore(g,s)}(document,'script'));");
		h.push("		</script>");
	}
	
	h.push('	</body>');
	h.push('</html>');
	
	return h.join('');
};
exports.page = html.page;