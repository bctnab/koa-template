const { getValue } = require('../helpers/redis-config');
const { ForbiddenError } = require('../core/http-exception');
const { ObjectToId } = require('../utils/mongoose');

const authMiddleware = async (ctx, next) => {
  const SESSDATA = ctx.cookies.get('SESSDATA');
  if (!!SESSDATA) {
    try{
      const uid = await getValue(SESSDATA);
      ctx.uid = ObjectToId(uid);
      ctx.token = SESSDATA;
      await next();
    }catch(e){
      throw new ForbiddenError('令牌过期，请重新登陆');
    }
  }else{
    throw new ForbiddenError('令牌验证失败');
  }
};

module.exports = authMiddleware;