'use strict'

const Koa = require('koa');
const privateRouter = require('./routes/private/index');
const publicRouter = require('./routes/public/index');
const config = require('./config/config');
const mongoose = require('mongoose');
const koaBody = require('koa-body');
const helmet = require("koa-helmet");
const errorMiddleware = require('./middlewares/error.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');
const noFindMiddleware = require('./middlewares/noFind.middleware')

const app = new Koa();

// web 安全
app.use(helmet())

// Logger
app.use(loggerMiddleware);

// Error Handler
app.use(errorMiddleware);

// file
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));

mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// router
app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
app.use(privateRouter.routes()).use(privateRouter.allowedMethods());

// 404
app.use(noFindMiddleware);

module.exports = app;