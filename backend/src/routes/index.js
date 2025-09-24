const express = require('express');
const router = express.Router();
const dataRoutes = require('./dataRoutes');
const healthController = require('../controllers/healthController');

// Health check route
router.get('/health', healthController.healthCheck);

// Data routes
router.use('/data', dataRoutes);

module.exports = router;
