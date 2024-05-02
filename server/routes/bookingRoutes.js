const express = require('express');
const { createBooking, getAllUserBookings, getServiceBookings } = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Создание новой записи на услугу
router.post('/', authenticateToken, createBooking);

// Получение всех записей пользователя
router.get('/user/:userId', authenticateToken, getAllUserBookings);

// Получение всех записей на услугу
router.get('/service/:serviceId', authenticateToken, getServiceBookings);

module.exports = router;
