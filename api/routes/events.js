const express = require("express");

const router = express.Router();


router.post("/create", (req, res) => {
  res.send("create new event");
});

router.get("/", (req, res) => {
  res.send("send all events");
});

router.get("/:id", (req, res) => {
  res.send("send one events");
});

router.put("/:id", (req, res) => {
  res.send("update an event");
});

router.delete("/:id", (req, res) => {
  res.send("delete an event");
});

module.exports = router