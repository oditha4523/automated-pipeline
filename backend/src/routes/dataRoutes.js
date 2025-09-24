const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// GET /api/data - Get all data with pagination
router.get('/', dataController.getAllData);

// GET /api/data/:id - Get data by ID
router.get('/:id', dataController.getDataById);

// POST /api/data - Create new data
router.post('/', dataController.createData);

module.exports = router;
