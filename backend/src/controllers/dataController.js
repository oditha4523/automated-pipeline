const dataService = require('../services/dataService');
const logger = require('../utils/logger');

const getAllData = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await dataService.fetchAllData(page, limit);
    
    res.status(200).json({
      success: true,
      data: data,
      message: 'Data retrieved successfully'
    });
  } catch (error) {
    logger.error('Error in getAllData:', error);
    next(error);
  }
};

const createData = async (req, res, next) => {
  try {
    const newData = req.body;
    const result = await dataService.insertData(newData);
    
    res.status(201).json({
      success: true,
      data: result,
      message: 'Data created successfully'
    });
  } catch (error) {
    logger.error('Error in createData:', error);
    next(error);
  }
};

const getDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await dataService.fetchDataById(id);
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      message: 'Data retrieved successfully'
    });
  } catch (error) {
    logger.error('Error in getDataById:', error);
    next(error);
  }
};

module.exports = {
  getAllData,
  createData,
  getDataById
};
