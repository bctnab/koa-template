const redis = require('redis')
const config = require('../config/config')
 
const options = {
  host: config.redis.host,
  port: config.redis.port,
  // prefix: '***', //存诸前缀
  // ttl: 60 * 60 * 24 * 7 * 1000,  //过期时间
  retry_strategy: function (options) {
    
    // 重连机制
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      console.log('redis server refused the connection');
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      console.log('redis connect error');
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
}
 
// 生成redis的client
const client = redis.createClient(options)
 
// 存储值
const setValue = (key, value) => {
  return new Promise((resolve, reject) => {
    if (typeof value === 'string') {
      client.set(key, value, function(err, res){
        if (err !== null) {
          reject(new Error(err));
        }else{
          resolve(res);
        }
      })
    } else {
      throw new Error('数据格式错误');
    }
  })
}

// 删除
const delValue = (key) => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, res) => {
      if (err !== null) {
        reject(new Error(err));
      }else{
        resolve(res);
      }
    })
  })
}

// 获取string
const getValue = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err !== null) {
        reject(new Error(err));
      }else{
        resolve(res)
      }
    })
  })
}

// 判断是否 key 存在
const isKey = (key) => {
  return new Promise((resolve, reject) => {
    client.exists(key, function(err, reply) {
      if (reply === 1) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  })
}
 
// 导出
module.exports = {
  isKey,
  setValue,
  getValue,
  delValue
}