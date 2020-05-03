const router = require('express').Router();
const { getTodos } = require('./todo.controller.js');

router.get('/todos', getTodos);

module.exports = router;
