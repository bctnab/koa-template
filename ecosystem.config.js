module.exports = {
  apps: [{
    name: 'koa-template',
    script: './src/bin/www.js',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: ["node_modules", "logs"],
    env_pro: {
      "NODE_ENV": "production",
      "REMOTE_ADDR": ""
    },
    env_dev: {
      "NODE_ENV": "development",
      "REMOTE_ADDR": ""
    }
  }]
};