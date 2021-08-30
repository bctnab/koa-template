const bcrypt = require('bcryptjs');
const User = require('../models/user');
const wrapAsync = require('../helpers/wrap-async');
const { delValue } = require('../helpers/redis-config');
const {
  validateLogin
} = require('../utils/validator');
const { InvalidQueryError } = require('../core/http-exception');

//? 登陆
const login = wrapAsync(async (ctx) => {
  const {
    username, password
  } = ctx.request.body;

  const errors = validateLogin(username, password);
  if (Object.keys(errors).length > 0) throw new InvalidQueryError(errors);

  const user = await User.findOne({
    username: username
  });

  if (!user) throw new InvalidQueryError("账户或密码错误");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new InvalidQueryError("账户或密码错误");

  const token = await user.generateToken();

  return token;
})

//? 删除
const cancel = wrapAsync(async (ctx) => {
  await User.deleteOne({
    _id: ctx.uid
  });
  await delValue(ctx.token);
  return '删除完成';
})

//? 添加用户
const create = wrapAsync(async (ctx) => {
  const {
    username, password
  } = ctx.request.body;

  const errors = validateLogin(username, password);

  if (Object.keys(errors).length > 0) throw new InvalidQueryError(errors);

  const user = new User({
    username, password
  });

  await user.save();
  return '用户添加完成';
})

module.exports = {
  login,
  create,
  cancel
}