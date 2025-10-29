const express = require("express");
const { body, query, param } = require("express-validator");
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const authorization = require("../middleware/authorization");

const router = express.Router();

// public routes
router.get("/", getAllEvents);
router.get("/:id", param("id").exists().notEmpty(), getEvent);

// private routes
router.post(
  "/",
  authorization,
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

router.put(
  "/:id",
  authorization,
  [
    body("title").notEmpty().escape().optional().trim(),
    body("organizer").notEmpty().escape().optional().trim(),
    body("description").notEmpty().escape().optional().trim(),
    body("startDate").notEmpty().escape().optional().trim(),
    body("duration").notEmpty().escape().optional().trim(),
    body("photos").isArray().optional(),
  ],
  updateEvent
);

router.delete(
  "/:id",
  authorization,
  param("id").exists().notEmpty(),
  deleteEvent
);

module.exports = router;
