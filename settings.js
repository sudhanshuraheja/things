
// The details about where the site is running
exports.hostname = 'localhost';
exports.port = 8080;

// Set your basepath in settings, so that the rest of the system can use it
exports.basepath = '';

// database
exports.dbName = 'test';
exports.dbHost = 'localhost';
exports.dbPort = '27017';

// The routes
exports.routes = [
];

// The html which gets rendered when a 404 is to be shown
exports.doc404 = { error: { code: 404, description: "This url does not exist"}};
