const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const User = db.usuario;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]
  console.log(req.headers)
  if (!token) {
    return res.status(403).send({
      auth:false,
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        auth: false,
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    return res.status(200).send({
      auth: true,
      message: "Authorized!",
    })
    //next();
  });
};
/* isAdmin = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.userId);
    const roles = await usuario.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
}; */
/* const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
}; */
const authJwt = {
    verifyToken
}
module.exports = authJwt;