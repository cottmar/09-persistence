'use strict';

const uuid = require('uuid/v4');
const logger = require('../lib/logger');

module.exports = class {
  constructor(name, breed) {
    if (!name || !breed) throw new Error('POST request requires dog name and breed');
    this.name = name;
    this.breed = breed;
    this.id = uuid();
    logger.log(logger.INFO, `NOTE: created a new doge ${JSON.stringify(this)}`);
  }
};
