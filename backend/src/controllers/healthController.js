const { getPool } = require('../config/db');

const healthCheck = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query('SELECT 1 as health');
    
    res.status(200).json({
      status: 'OK',
      message: 'Service is healthy',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Service is unhealthy',
      database: 'Disconnected',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};

module.exports = {
  healthCheck
};
