const TodoRepo = require('./todo.repo');

const getTodos = async (req, res) => {
  const statement = 'select * from todo';
  const data = await TodoRepo.execute(statement);
  res.json(data.rows);
};

module.exports = {
  getTodos,
};
