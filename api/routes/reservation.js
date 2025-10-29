const {
  createReservation,
  getReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservation");

const { body, param } = require("express-validator");

const router = require("express").Router();

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
router.get("/", getAllReservations);
router.get("/:id", param("id").exists().notEmpty(), getReservation);
router.put(
  "/:id",
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
router.delete("/:id", param("id").exists().notEmpty(), deleteReservation);

module.exports = router;
