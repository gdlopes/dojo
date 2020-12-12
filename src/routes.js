const { Router } = require('express');

const MessageController = require('./controllers/MessageController');

const routes = new Router();

routes.post('/message', MessageController.send);

module.exports = routes;