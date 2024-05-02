const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
require('dotenv').config();

const generateJWT = (id, username, email, role) => {
  return jwt.sign({ id, username, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '200h' }
  );
};

class UserController {
  async registration(req, res, next) {
    console.log('Received data:', req.body);
    console.log('Received file:', req.file);
    const { fullName, email, username, password } = req.body;
    const avatar = req.file;
    if (!email || !password || !username) {
      return next(ApiError.badRequest('Заполните все поля'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      username,
      password: hashPassword,
      role: 'user'
    });

    const token = generateJWT(user.id, user.username, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    console.log(`Attempting to log in user: ${username}`);
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid password');
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateJWT(user.id, user.username, user.email, user.role);
      console.log(`User logged in successfully: ${user.username}`);
      return res.json({ token });
    } catch (error) {
      console.error(`Login error for user ${username}:`, error);
      next(error);
    }
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.username, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
