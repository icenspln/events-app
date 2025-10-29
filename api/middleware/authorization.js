const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  let jwt;
  if (token) jwt = token.split(" ")[1];

  // req doesn't have auth header or
  // wrong format or empty token
  if (!token || !jwt) {
    return res.status(403).send();
  }
  // req doesn't have auth header or

  JWT.verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // req DOES have auth JWT header, but signatures dont match
      return res.status(401).send();
    }
    req.userId = decoded;
    next();
  });
};
