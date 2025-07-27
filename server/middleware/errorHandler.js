// server/middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  console.error('🧨 错误捕获:', err.stack || err.message);

  // express-validator 错误提前处理了，这里是兜底
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
}