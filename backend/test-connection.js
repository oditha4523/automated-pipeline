const sql = require('mssql');
require('dotenv').config();

const config = {
  server: 'chamod.database.windows.net',
  database: 'automated-pipeline3',
  user: 'oditha',
  password: 'Chamod@4523',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

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
