const sql = require("mssql");
require('dotenv').config();

const config = {
  connectionString: process.env.AZURE_SQL_CONNECTION
};

// Create a connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Connected to Azure SQL Database");
    return pool;
  })
  .catch(err => {
    console.error("❌ Database connection failed: ", err);
    process.exit(1);
  });

module.exports = {
  sql, poolPromise
};
