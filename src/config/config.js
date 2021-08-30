'use strict'

require('dotenv').config();
const { join } = require('path');

module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.APP_PORT || "6060",
  logName: 'logs',
  logPath: join(__dirname, '../../logs'),
  db: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE
  },
  redis: {
    pwd: process.env.REDIS_PWD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
};