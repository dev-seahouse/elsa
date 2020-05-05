require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const methodOverride = require('method-override');
const { handle404, handle500 } = require('./shared/ErrorHandlers');
const TodoRoutes = require('./todo/todo.routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const APP_ROOT = '/';

app.use(helmet());
app.use(cors());
app.disable('x-powered-by');
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(APP_ROOT, TodoRoutes);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'));
});

// !no routes below
app.use(handle404);
app.use(handle500);
// !no routes below

app.listen(PORT, () => {
  console.log(`> Ready on http://localhost: ${PORT}`);
});
