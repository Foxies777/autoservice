const express = require('express');
const multer = require('multer');
const UserController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/registration', upload.single('avatar'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    next();
}, UserController.registration);


router.post('/login', UserController.login);

router.get('/auth', authenticateToken, UserController.check);

module.exports = router;
