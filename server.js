var connect = require('connect');
    serveStatic = require('serve-static');
    network = require('network');
	port = process.env.PORT || 8080;
    project = require('./package.json');
    winston = require('winston');
    liveReload = require('livereload');

connect().use(serveStatic(__dirname)).listen(port);

winston.info("Running " + project.name);
winston.info("Directory: " + __dirname);

var liveReloadServer = liveReload.createServer();
liveReloadServer.watch(__dirname);

network.get_active_interface(function(err, obj) {
	winston.info("The magic happens at");
    winston.info('\t http://localhost:' + port);
    winston.info('\t ' + obj.ip_address+":" + port);
});
