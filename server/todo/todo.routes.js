const router = require('express').Router();
const { getTodos, addNewTodo } = require('./todo.controller.js');

router.get('/todos', getTodos);
router.post('/todos', addNewTodo);

module.exports = router;
