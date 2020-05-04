const TodoRepo = require('./todo.repo');

const getTodoReq = (req) => {
  let {
    content,
    is_completed,
    date_added,
    date_updated,
    app_user_id,
  } = req.body;
  let returnedObj = {
    content,
    is_completed,
    date_added,
    date_updated,
    app_user_id,
  };

  return returnedObj;
};

const getTodos = async (req, res) => {
  const statement = 'select * from todo';
  const data = await TodoRepo.execute(statement);
  return res.json(data.rows);
};

const addNewTodo = async (req, res) => {
  const execRes = await TodoRepo.insert(getTodoReq(req));
  return res.json(execRes.rows[0] || '');
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  // console.log(req.body);
  const execRes = await TodoRepo.update(getTodoReq(req), id);
  return res.json(execRes);
};

module.exports = {
  getTodos,
  addNewTodo,
  updateTodo,
};
