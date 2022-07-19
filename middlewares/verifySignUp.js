const {User} = require("../models");
//const ROLES = db.rol;
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Email
    usuario = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (usuario) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: error
    });
  }
};
/* checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
}; */
/* const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}; */
const verifySignUp = {
    checkDuplicateUsernameOrEmail
}
module.exports = verifySignUp;