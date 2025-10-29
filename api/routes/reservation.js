const { body, param } = require("express-validator");
const router = require("express").Router();
const {
  createReservation,
  getReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservation");
const authorization = require("../middleware/authorization");

// public routes
router.post(
  "/",
  [
    body(["firstName", "lastName", "phone", "email", "eventId"])
      .exists()
      .notEmpty()
      .escape()
      .isString()
      .trim(),
    ,
  ],
  createReservation
);

// private routes
router.get("/", authorization, getAllReservations);

router.get(
  "/:id",
  authorization,
  param("id").exists().notEmpty(),
  getReservation
);

router.put(
  "/:id",
  authorization,
  [
    param("id").exists().notEmpty(),
    body(["firstName", "lastName", "phone", "email", "eventId"])
      .exists()
      .notEmpty()
      .escape()
      .isString()
      .trim(),
    ,
  ],
  updateReservation
);

router.delete(
  "/:id",
  authorization,
  param("id").exists().notEmpty(),
  deleteReservation
);

module.exports = router;
