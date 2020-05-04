const router = require('express').Router();
const { getTodos, addNewTodo, updateTodo } = require('./todo.controller.js');

router.get('/todos', getTodos);
router.post('/todos', addNewTodo);
router.put('/todos/:id', updateTodo);

module.exports = router;
