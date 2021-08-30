const router = require('koa-router')();
const { cancel } = require('../../controllers/user');

router.get('/cancel', cancel);

module.exports = router;