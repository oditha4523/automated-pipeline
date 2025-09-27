const sql = require('mssql');
require('dotenv').config();

// Parse connection string to get credentials
const parseConnectionString = (connectionString) => {
  const params = {};
  const pairs = connectionString.split(';');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      params[key.trim()] = value.trim();
    }
  });
  
  return {
    server: params.Server?.replace('tcp:', '').split(',')[0],
    database: params.Database,
    user: params.Uid,
    password: params.Pwd,
    options: {
      encrypt: params.Encrypt === 'yes',
      trustServerCertificate: params.TrustServerCertificate === 'no'
    }
  };
};

// Get config from environment variables
const config = parseConnectionString(process.env.AZURE_SQL_CONNECTION);

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Connect to the database
    const pool = await sql.connect(config);
    console.log('✅ Connected to Azure SQL Database');
    
    // Execute a simple test query
    const result = await pool.request().query('SELECT 1 as test');
    console.log('✅ Test query successful:', result.recordset);
    
    // Check for existing tables
    const tablesQuery = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE'
    `;
    const tables = await pool.request().query(tablesQuery);
    
    if (tables.recordset.length > 0) {
      console.log('📋 Existing tables:', tables.recordset.map(t => t.TABLE_NAME).join(', '));
    } else {
      console.log('📋 No tables found in the database');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error(error);
  } finally {
    // Close the connection
    await sql.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();
