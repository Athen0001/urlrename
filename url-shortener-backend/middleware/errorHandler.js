const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something goes wrong.";

  res.status(statusCode).json({
    error: message,
    details: err.details || null,
  });
};

export default errorHandler;
