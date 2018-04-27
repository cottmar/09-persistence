'use strict';

const http = require('http');

// Router setup 
const Router = require('./router');

const router = new Router();
require('../route/doge-route')(router);

// Application set up 
const app = http.createServer(router.route());

const server = module.exports = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
