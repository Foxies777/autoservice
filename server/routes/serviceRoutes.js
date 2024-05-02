const express = require('express');
const { createService, getAllServices } = require('../controllers/serviceController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Создание новой услуги
router.post('/', authenticateToken, isAdmin, createService);

// Получение списка всех услуг
router.get('/', authenticateToken, getAllServices);

module.exports = router;
