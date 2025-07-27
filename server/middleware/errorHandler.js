// server/middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  console.error('🧨 Error caught:', err.stack || err.message);

  // This is a fallback error handler; express-validator errors are handled earlier
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
}
