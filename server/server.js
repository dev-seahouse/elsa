require('dotenv').config();
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const { handle404, handle500 } = require('./shared/ErrorHandlers');
const TodoRoutes = require('./todo/todo.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const APP_ROOT = '/';

app.use(cors());
app.use(methodOverride('_method'));
app.disable('x-powered-by');
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get(APP_ROOT, (req, res) => {
  res.json('~elsa api~');
});

app.use(APP_ROOT, TodoRoutes);

// !no routes below
app.use(handle404);
app.use(handle500);
// !no routes below

app.listen(PORT, () => {
  console.log(`> Ready on http://localhost: ${PORT}`);
});
