const express = require("express");
const { body, query, param } = require("express-validator");
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

const router = express.Router();

router.post(
  "/",
  [
    body("title").notEmpty().escape(),
    body("organizer").notEmpty().escape(),
    body("description").notEmpty().escape(),
    body("startDate").notEmpty().escape(),
    body("duration").notEmpty().escape(),
    body("photos").isArray(),
  ],
  createEvent
);

router.get("/", getAllEvents);

router.get("/:id", param("id").exists().notEmpty(), getEvent);

router.put(
  "/:id",
  [
    body("title").notEmpty().escape().optional(),
    body("organizer").notEmpty().escape().optional(),
    body("description").notEmpty().escape().optional(),
    body("startDate").notEmpty().escape().optional(),
    body("duration").notEmpty().escape().optional(),
    body("photos").isArray().optional(),
  ],
  updateEvent
);

router.delete("/:id", param("id").exists().notEmpty(), deleteEvent);

module.exports = router;
