const { Service } = require('../models/models');

const createService = async (req, res) => {
  try {
    const { name, availableSlots, date } = req.body;
    const newService = await Service.create({
      name,
      availableSlots,
      date
    });

    res.status(201).send(newService);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.send(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createService, getAllServices };
