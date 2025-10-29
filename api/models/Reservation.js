const { model, Schema } = require("mongoose");

const reservationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  eventId: { type: String, required: true },
});

module.exports = model("Reservation", reservationSchema);
