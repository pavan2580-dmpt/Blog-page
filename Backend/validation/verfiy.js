const jwt = require("jsonwebtoken");

const Validation = async (req, res, next) => {
  try {
    let token = req.header('x-token');
    if (!token) {
      res.status(403).send("No token found");
    } else {
      const decode = jwt.verify(token, "@#$%^&*()");
      if(!decode){
        res.send("no decode")
      }
      console.log(decode); 
      req.user = decode.user;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error...");
  }
};

module.exports = Validation;
