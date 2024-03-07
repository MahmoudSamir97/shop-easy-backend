exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res).catch((err) => next(err));
  };
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1- LOG ERROR
    console.log(`Error  ${err}`);
    // 2- SEND GENERIC MESSAGE
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

// eslint ignore
exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
