const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    duration: { type: Date, required: true },
    photos: [String],
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
