const router = require('koa-router')();
const { login, create } = require('../../controllers/user');

router.post('/login', login);
router.post('/create', create);

module.exports = router;