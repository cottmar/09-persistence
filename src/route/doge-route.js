'use strict';

const logger = require('../lib/logger');
const Doge = require('../model/doge');
const storage = require('../lib/storage');

module.exports = function routeNote(router) {
  router.post('/api/v1/doge', (req, res) => {
    logger.log(logger.INFO, 'NOTE-ROUTE: POST /api/v1/doge');

    try {
      const newDoge = new Doge(req.body.name, req.body.breed);
      storage.create('Doge', newDoge)
        .then((doge) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(doge));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `DOGE-ROUTE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request THIS OTHER ONE');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/doge', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }

    storage.fetchOne('Doge', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
