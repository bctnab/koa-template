const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { setValue } = require('../helpers/redis-config');
const {
  Schema,  model
} = require('mongoose');

const userSchema = Schema({
  //? 用户名
  username: {
    type: String,
    trim: true,
    required: [true, '用户名错误'],
  },
  //? 密码
  password: {
    type: String,
    trim: true,
    required: [true, '密码不能为空'],
    set: pwd => {
      if (!pwd) return "";
      return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
    }
  }
}, {
  versionKey: false,
  timestamps: true
});

userSchema.methods.generateToken = async function () {
  const _id = this._id.toString();
  const _uuid = uuidv4();

  try{
    await setValue(_uuid, _id);
  }catch(e){
    throw new Error('token 获取失败');
  }
  
  return _uuid;
};

const User = model("users", userSchema);

module.exports = User;