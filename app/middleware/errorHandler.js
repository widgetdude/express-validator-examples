const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.meta = err.meta || {};

  // Log to console for dev
  console.log(err);

  res.status(error.statusCode).json({
    success: false,
    error: error.message || "Server Error",
    status: error.statusCode,
    meta: error.meta,
  });
};

module.exports = errorHandler;
