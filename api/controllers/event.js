const { validationResult } = require("express-validator");
const Event = require("../models/Event");

const createEvent = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { title, organizer, description, startDate, duration, photos } =
      req.body;

    await Event.create({
      title,
      organizer,
      description,
      startDate,
      duration,
      photos,
    });
    res.status(201).json({ success: true, message: "Event created." });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, events: events });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found!" });
    }

    res.status(200).json({ success: true, event: event });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const updateEvent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found!" });
    }

    await event.updateOne(req.body);
    res.status(200).json({
      success: true,
      message: "Update successfull.",
    });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

const deleteEvent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found!" });
    }

    await event.deleteOne();
    res.status(200).json({
      success: true,
      message: "Delete successfull.",
    });
  } catch (err) {
    console.log("Error: " + err.message);
    next(err);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
