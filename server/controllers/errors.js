const handle404 = (req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
};

const handle500 = (error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
};

module.exports = {
  handle404,
  handle500,
};
