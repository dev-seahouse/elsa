const TodoRepo = require('./todo.repo');

const getTodos = async (req, res) => {
  const statement = 'select * from todo';
  const data = await TodoRepo.execute(statement);
  res.json(data.rows);
};

const addNewTodo = async (req, res) => {
  const content = req.body.content;
  const is_completed = req.body.is_completed;
  const date_added = req.body.date_added;
  const date_updated = req.body.date_updated;
  const app_user_id = req.body.app_user_id;

  const execRes = await TodoRepo.insert({
    content,
    is_completed,
    date_added,
    date_updated,
    app_user_id,
  });

  res.json(execRes.rows[0]);
};

module.exports = {
  getTodos,
  addNewTodo,
};
