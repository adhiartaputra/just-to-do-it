const express = require('express');
const router = express.Router();
const { authlogin } = require('../middleware/auth')
const { loginFB } = require('../controllers/login')

router.post('/', loginFB)

module.exports = router;