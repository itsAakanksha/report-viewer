const errorHandler = (err, req, res, next) => {
  const traceId = req.headers['x-trace-id'] || 'unknown';
  
  // Log the error with trace ID
  req.logger.error('Request error', {
    error: err.message,
    stack: err.stack,
    traceId,
    method: req.method,
    url: req.originalUrl,
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    traceId,
    timestamp: new Date().toISOString(),
  });
};

// 404 handler
const notFoundHandler = (req, res) => {
  const traceId = req.headers['x-trace-id'] || 'unknown';
  
  req.logger.warn('Route not found', {
    method: req.method,
    url: req.originalUrl,
    traceId,
  });

  res.status(404).json({
    success: false,
    message: 'Route not found',
    traceId,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
