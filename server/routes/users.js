const express = require('express');
const router = express.Router();
const { getUser, getUserDetail, deleteUser } = require('../controllers/user')


/* GET users listing. */
router
.get('/', getUser)
.delete('/:_id', deleteUser)

module.exports = router;
