const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX) || 10,
    min: parseInt(process.env.DB_POOL_MIN) || 2,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // Required for Azure SQL
    trustServerCertificate: false
  },
  requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT) || 30000,
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 15000
};

let pool = null;

const connectDB = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(dbConfig);
      console.log('Connected to Azure SQL Database');
    }
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return pool;
};

module.exports = {
  connectDB,
  getPool,
  sql
};
