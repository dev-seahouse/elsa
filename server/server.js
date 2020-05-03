require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const { handle404, handle500 } = require('./controllers/errors');

const app = express();

const APP_ROOT = '/';
const PORT = 5000;

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

// !no routes below
app.use(handle404);
app.use(handle500);
// !no routes below

app.listen(PORT, () => {
  console.log(`> Ready on http://localhost: ${PORT}`);
});
