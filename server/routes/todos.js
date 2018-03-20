const express = require('express');
const router = express.Router();
const { addTodo, showTodo, updateTodo, deleteTodo, searchTodo } = require('../controllers/todo')


/* GET users listing. */
router
.get('/', showTodo)
.get('/search', searchTodo)
.post('/', addTodo)
.put('/', updateTodo)
.delete('/', deleteTodo)

module.exports = router;
