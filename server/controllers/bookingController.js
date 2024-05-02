const { Booking, Service, User } = require('../models/models');

const createBooking = async (req, res) => {
  try {
    const { userId, serviceId } = req.body;
    const service = await Service.findByPk(serviceId);
    if (!service || service.availableSlots <= 0) {
      return res.status(400).send("Service not available or full");
    }

    const newBooking = await Booking.create({
      userId,
      serviceId,
      status: 'active'
    });

    // Decrement the available slots
    service.availableSlots -= 1;
    await service.save();

    res.status(201).send(newBooking);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Добавим новую функцию в ваш bookingController

const getAllUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;  // ID пользователя берем из параметров запроса
    const bookings = await Booking.findAll({
      where: { userId },
      include: [{
        model: Service,  // Включаем данные о услуге
        as: 'service'
      }]
    });

    if (bookings.length === 0) {
      return res.status(404).send("No bookings found for this user.");
    }

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getServiceBookings = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    
    const bookings = await Booking.findAll({
      where: { serviceId },
      include: [{
        model: User,  
        attributes: ['id', 'username', 'email'], 
      }]
    });

    if (bookings.length === 0) {
      return res.status(404).send("No bookings found for this service.");
    }

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { createBooking, getAllUserBookings, getServiceBookings };


