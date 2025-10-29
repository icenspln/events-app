const errorHandler = (err, req, res, next) => {
  if (err) {
    // if this is reached, the err is actually just a wrong URI, im sending 404 instead of 500
    if (err.name === "CastError" && err.path === "_id") {
      return res.status(404).json({ success: false, message: "Not found!" });
    }

    res.status(500).json({ success: false, message: "Internal error!" });
  }

  // fallback behavior
  res.status(500).json({ success: false, message: "Internal error!" });
};

module.exports = { errorHandler };
