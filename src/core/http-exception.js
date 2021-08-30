'use strict'

class HttpException extends Error {

  constructor(message = '服务器异常', errors = '', code = 500, status = 500) {
    super(message);
    this.errors = errors;
    this.code = code;
    this.status = status;
  }

}

module.exports = {
  HttpException,
  /**
   * 拒绝访问构造函数
   */
   ForbiddenError: class ForbiddenError extends HttpException {
    constructor (errors = '', message = '拒绝访问') {
      super(message, errors, 403, 403)
    }
  },
  /**
   * 404的参数构造函数
   */
   NotFoundError: class NotFoundError extends HttpException {
    constructor (errors = '', message = 'Not Found') {
      super(message, errors, 404, 404)
    }
  },
  /**
   * 无效的参数构造函数
   */
  InvalidQueryError: class InvalidQueryError extends HttpException {
    constructor (errors = '', message = '无效的参数') {
      super(message, errors, 400, 400)
    }
  }
};

