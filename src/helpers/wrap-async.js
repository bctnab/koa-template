const { InvalidQueryError } = require('../core/http-exception');

const wrapAsync = function(fn){
  return async function(ctx){
    await fn(ctx).then(result => {
      ctx.type = 'json';
      ctx.body = {
        code: 0,
        message: 'success',
        data: result
      };
    }).catch(err => {
      if (err.name === 'ValidationError') {
        let errors = {};
        for (let error in err.errors) {
          errors[error] = err.errors[error].message
        }
        throw new InvalidQueryError(errors);
      }
      throw err;
    });
  }
}

module.exports = wrapAsync;