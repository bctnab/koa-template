const router = require('koa-router')();
const user = require('./user');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.use('/api/user', user.routes(), user.allowedMethods());

module.exports = router;