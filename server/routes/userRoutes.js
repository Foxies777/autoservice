const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware/auth');


const router = express.Router();

router.post('/registration', UserController.registration);


router.post('/login', UserController.login);

router.get('/auth', authenticateToken, UserController.check);

module.exports = router;
