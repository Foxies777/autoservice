const Router = require('express');
const router = new Router();
const userRouter = require('./userRoutes');
const serviceRouter = require('./serviceRoutes');
const bookingRouter = require('./bookingRoutes');

router.use('/user', userRouter);
router.use('/services', serviceRouter);
router.use('/bookings', bookingRouter);

module.exports = router;
