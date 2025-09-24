const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // SQL Server specific errors
  if (err.code) {
    switch (err.code) {
      case 'ECONNREFUSED':
        return res.status(503).json({
          success: false,
          message: 'Database connection failed',
          error: process.env.NODE_ENV === 'development' ? err.message : 'Service temporarily unavailable'
        });
      case 'ETIMEOUT':
        return res.status(408).json({
          success: false,
          message: 'Database request timeout',
          error: process.env.NODE_ENV === 'development' ? err.message : 'Request timeout'
        });
    }
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Something went wrong'
  });
};

module.exports = errorHandler;
