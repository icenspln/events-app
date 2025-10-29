const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  console.log("[DEBUG] 1");
  const token = req.header("Authorization");
  let jwt;
  console.log("[DEBUG] 2");
  if (token) jwt = token.split(" ")[1];

  console.log("[DEBUG] 3");
  // req doesn't have auth header or
  // wrong format or empty token
  if (!token || !jwt) {
    return res.status(403).send();
  }
  console.log("[DEBUG] 4");
  // req doesn't have auth header or

  JWT.verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("[DEBUG] 5");
      // req DOES have auth JWT header, but signatures dont match
      return res.status(401).send();
    }
    console.log("[DEBUG] 6");
    req.userId = decoded;
    next();
  });
};
