'use strict'

const { NotFoundError } = require('../core/http-exception');

const noFindMiddleware = () => {
  throw new NotFoundError('路由未定义');
}

module.exports = noFindMiddleware;