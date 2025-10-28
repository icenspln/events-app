const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal error!" });
  }
};

// NOTE figure out a error handler middlware to stop the non responding requrests

module.exports = { errorHandler };
