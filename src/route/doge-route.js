'use strict';

const logger = require('../lib/logger');
const Doge = require('../model/doge');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeDoge(router) {
  router.post('/api/v1/doge', (req, res) => {
    logger.log(logger.INFO, 'DOGE-ROUTE: POST /api/v1/doge');

    try {
      const newDoge = new Doge(req.body.name, req.body.breed);
      storage.create('Doge', newDoge)
        .then((doge) => {
          response.sendJSON(res, 201, doge);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `DOGE-ROUTE: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/doge', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 404, 'Your request requires an id');
      return undefined;
    }

    storage.fetchOne('Doge', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resouce not found');
        return undefined;
      });
    return undefined;
  });
};
