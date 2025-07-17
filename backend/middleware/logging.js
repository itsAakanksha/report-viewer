const logger = require('../utils/logger');

/**
 * Request logging middleware that tracks latency and includes trace ID
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request start
  logger.info('Request started', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    traceId: req.traceId
  });

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    // Log request completion
    logger.info('Request completed', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      latency: `${latency}ms`,
      traceId: req.traceId
    });
    
    // Call original end function
    originalEnd.call(this, chunk, encoding);
  };

  next();
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    traceId: req.traceId
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString(),
    traceId: req.traceId,
    ...(isDevelopment && { stack: err.stack })
  });
};

module.exports = {
  requestLogger,
  errorHandler
};
