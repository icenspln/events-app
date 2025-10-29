const { validationResult } = require("express-validator");
const Reservation = require("../models/Reservation");

const createReservation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { firstName, lastName, phone, email, eventId } = req.body;
    await Reservation.create({ firstName, lastName, phone, email, eventId });
    res.status(201).json({ success: true, message: "Creation successfull." });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const getAllReservations = async (_, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ success: true, reservations: reservations });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const getReservation = async (req, res, next) => {
  // not necessary
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Not found!" });
    }

    res.status(200).json({ success: true, reservation });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const updateReservation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { firstName, lastName, phone, email, eventId } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(id, {
      firstName,
      lastName,
      phone,
      email,
      eventId,
    });
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Not found!" });
    }

    res.status(200).json({ success: true, message: "Update successfull." });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Not found!" });
    }
    res.status(200).json({ success: true, message: "Delete successfull." });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
