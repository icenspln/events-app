const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: String,
    organizer: String,
    description: String,
    startDate: Date,
    duration: Date,
    photos: [String],
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
