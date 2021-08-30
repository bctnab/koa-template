'use strict'

const errorMiddleware = (ctx, next) => {
  return next().catch(err => {
    ctx.response.body = {
      code: err.code || 500,
      message: err.message.trim(),
      errors: err.errors || err.message.trim()
    };
    ctx.response.status = (err.status || 500);
  })
}

module.exports = errorMiddleware;