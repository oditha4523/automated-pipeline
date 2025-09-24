const { getPool, sql } = require('../config/db');
const logger = require('../utils/logger');

const fetchAllData = async (page = 1, limit = 10) => {
  try {
    const pool = getPool();
    const offset = (page - 1) * limit;
    
    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT * FROM YourTableName 
        ORDER BY id 
        OFFSET @offset ROWS 
        FETCH NEXT @limit ROWS ONLY
      `);
    
    return result.recordset;
  } catch (error) {
    logger.error('Error in fetchAllData:', error);
    throw error;
  }
};

const fetchDataById = async (id) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM YourTableName WHERE id = @id');
    
    return result.recordset[0];
  } catch (error) {
    logger.error('Error in fetchDataById:', error);
    throw error;
  }
};

const insertData = async (data) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('column1', sql.VarChar, data.column1)
      .input('column2', sql.VarChar, data.column2)
      .query(`
        INSERT INTO YourTableName (column1, column2) 
        OUTPUT INSERTED.* 
        VALUES (@column1, @column2)
      `);
    
    return result.recordset[0];
  } catch (error) {
    logger.error('Error in insertData:', error);
    throw error;
  }
};

module.exports = {
  fetchAllData,
  fetchDataById,
  insertData
};
