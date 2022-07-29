const connect = require("connect");
const serveStatic = require("serve-static");
const network = require("network");
const project = require("./package.json");
const winston = require("winston");
const liveReload = require("livereload");

const port = process.env.PORT || 3000;

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

connect().use(serveStatic(__dirname)).listen(port);

logger.info("Running " + project.name);
logger.info("Directory: " + __dirname);

var liveReloadServer = liveReload.createServer();
liveReloadServer.watch(__dirname);

network.get_active_interface(function (err, obj) {
    logger.info("The magic happens at");
    logger.info("\t http://localhost:" + port);
    logger.info("\t " + obj.ip_address + ":" + port);
});
