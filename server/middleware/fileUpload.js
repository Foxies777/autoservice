const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Указываем папку для загрузки
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Имя файла будет состоять из метки времени и оригинального имени
  }
});

const fileFilter = (req, file, cb) => {
  // Разрешаем только файлы изображений
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };
