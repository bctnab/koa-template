'use strict'

const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
const config = require('../config/config')

// logs目录，没有就新建
const logsDir = path.parse(config.logPath).dir;
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

let defaults = ['dateFile'];
if(config.environment === 'debug') defaults.push('logConsole');

// 配置log4.js
log4js.configure({
  // use appenders
  appenders: {
    logConsole: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: path.join(config.logPath, config.logName),
      maxLogSize: 1024*1024,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd.log"
    }
  },
  // 配置
  categories: {
    default: {
      appenders: defaults,
      level: 'info'
    }
  }
})
const logger = log4js.getLogger('[Default]');

// 记录日志
const loggerMiddleware = async (ctx, next) => {
  // 请求开始时间
  const start = new Date();

  await next();
  // 请求耗时
  const ms = new Date() - start;

  let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${ms}ms`;
  
  if(ctx.body.code === 0) logger.info(logText);
  else logger.error(logText);
}

module.exports = loggerMiddleware;