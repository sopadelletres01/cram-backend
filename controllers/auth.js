const {Sequelize,sequelize} = require("../models/db");
const {User,Token, Rol, Usu_comercio} = require("../models");
const smtpTransport = require("../config/mail")
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");


async function generateToken(idUser){
  // generate token and save
  const genToken = crypto.randomBytes(16).toString('hex')
  console.log("genToken",genToken)
  let token = await Token.findOne({where:{ idUser: idUser}});
  if(token) {
    const tokenUpdated = await Token.update({token:genToken},{where:{idUser:idUser},returning:true})
    token = await Token.findOne({where:{ idUser: idUser}});

    console.log("tokenUpdated",token)
  } else {
    token = await Token.create({ token: genToken , idUser:idUser, expire_date: Date.now() + 3600});
    console.log("tokenCreated",token.token)
  }
  if (!token){
    throw new Error("El token no se pudo crear correctamente...")
  }
  return token
}


// HAY QUE REFACTORIZA ❌❌❌❌❌❌❌❌❌❌❌❌
async function sendVerificationMail(req,res,user,token,type="account"){
  // Send email (use credintials of SendGrid)
  if ( !user ) throw new Error("QUe user ni que user")
  const isAccountType = type === "account"
  const uri = `${isAccountType ? `${req.headers.host}/api/auth/confirmation/${user.email}/${token}` : `localhost:3000/forgot/reset/${user.id}/${token}`}`
  const url = `http://${uri}`
  const mailOptions = {
    from: process.env.EMAIL_USER || 'cram.testing@gmail.com', 
    to: user.email, 
    subject: isAccountType ? 'Account Verification Link' : 'Password reset link' ,
    text: `Hello ${user.name} \n\n
    Please ${isAccountType ? "verify your account" : "reset your password" } by clicking the link: 
    ${url}\n\n
    Thank You!!
    `
  }
  console.log("uri",uri)
  console.log("url",url)
  console.log("mailOptions",mailOptions)
  console.log("TOKEN",token)
  smtpTransport.sendMail(mailOptions, function (err) {
    if (err) { 
      return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
    }
    return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
  });
  return
  
}

exports.register = async (req, res) => { 
  try { 
    const user = await User.findOne({ where: { dni: req.body.dni } })
    console.log(user)
    if (!user) { 
      const passwordIsValid = req.body.password === req.body.rep_password
      
      if (!passwordIsValid) { 
        return res.status(403).send({message: "Passwords are not the same"})
      }
      const hashPassword = bcrypt.hashSync(req.body.password, 8)
      // Damos de alta al usuario
      const createdUser = await User.create({...req.body,
        password: hashPassword,
        isVerified:0
      });
      console.log(createdUser)
      let tokenObject = await generateToken(createdUser.id)
      await sendVerificationMail(req,res,createdUser,tokenObject.token)
      res.status(201).send({ user: createdUser, message: "User registered successfully!" });
    
    }
  } catch (error) { 
    console.log(error)

    res.status(500).send({ message: error });

  }

}

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.findOne({where:{dni:req.body.dni}})
    console.log("USER",user)
    // USUARIO CON CSV
    if(!user) return res.status(403).send({message:"User with dni not found"})
    if ( user.password  ) {
      return res.status(400).send({message:"El user con este dni ya esta registrado en nuestra aplicacion..."})
    }

    const passwordIsValid = req.body.password===req.body.rep_password
    if( !passwordIsValid ){
      res.status(403).send({message: "Passwords are not the same"})
    }

    console.log("USERDNI",user)
    if (!user){
      return res.status(404).send({message:"No user with matching dni was found"})
    }

    const updatedUser = await user.update({
        password: bcrypt.hashSync(req.body.password, 8),
        isVerified:0
    });
    
    console.log("updatedUser",updatedUser)

    if ( !user ) throw new Error("No se ha podido crear el user")
    let tokenObject = await generateToken(user.id)
    await sendVerificationMail(req,res,user,tokenObject.token)
    if (user) res.status(201).send({ user: user, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
exports.signin = async (req, res) => {
  try {
    // return res.status(401).send({auth: false,message:'Your Email has not been verified. Please click on resend'});

    /* if ( req.session.user ){
      return res.send({auth: true, user: req.session.user})
    } */
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log("USer",user)
    if (!user) {
      return res.status(404).send({ auth: false, message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(403).send({
        auth: false,
        message: "Invalid Password!",
      });
    }
    if (!user.isVerified){
      return res.status(401).send({auth: false,message:'Your Email has not been verified. Please click on resend'});
    } 
    // -----cambiadooooooo--------
    const {remember} = req.body
    const isAdmin = user.rol === 54 
    const payload = { id:user.id, email:user.email, isVerified:true, isAdmin:isAdmin};
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: remember ? '24h' : '6h' })
    console.log("TOKEN", authToken)
   
				res.status(200).json({ authToken: authToken });
    /*let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    } */
    
  } catch (error) {
    console.log("ERORR",error)
    return res.status(500).send({ auth: false, message: error.message });
  }
};
exports.signout = async (req, res) => {
  try {
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
exports.forgotEmail = async (req, res) => {
  try {
    const user = await User.findOne({where:{ email: req.body.email }});
    if (!user)
        return res.status(400).send("user with given email doesn't exist");

    const token = await generateToken(user.id)
    await sendVerificationMail(req,res,user,token.token,"forgot")

  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const {id,token,password} = req.body
    const user = await User.findByPk(id);
    if (!user){
      return res.status(400).send("User with the selected id doesn't exist");
    }
    console.log("TOKEN",token)

    let tokenToFind = await Token.findOne({where:{ token: token, idUser: id }});
    console.log("TOKEN",tokenToFind.token)
    if (!tokenToFind) {
      return res.status(400).send("The token is invalid");
    }
    if(user.password === password){
      return res.status(400).send("The password cannot be the same");
    }
    //Habria que controlar que viniese una contraseña encriptada, por defecto en el frontend, esta encriptada
    //let newPassword = bcrypt.hashSync(password, 8)

    await user.update({password:password})
    return res.status(200).send({message: "User password updated correctly"})
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: e.message });
  }
};
exports.confirmEmail = async (req, res) => {
  // return res.status(200).send('Your account has been successfully verified');
    console.log(req.params)
    const token = await Token.findOne({ where: { token: req.params.token } })
    // token is not found into database i.e. token may have expired 
    if (!token) {
        return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
    }
    // if token is found then check valid user 
    else {
        const user = await User.findByPk(token.idUser)
        // not valid user
        console.log("USER ",user)
        if (!user) {
            return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        }
        // user is already verified
        else if (user.isVerified) {
            return res.status(200).send('User has been already verified. Please Login');
        }
        // verify user
        else {
            // change isVerified to true
            // destroy verification token ?
            try{
                await token.destroy()
                await user.update( 
                    {isVerified:1}
                )
                return res.status(200).send('Your account has been successfully verified');
            }
            catch(e){
                return res.status(500).send({ message: e.message });
            }
        }
    }
}

exports.resendLink = async (req, res, next) => {
  /* const userr = {
    id: 1,
    name:"Ozark",
    email:req.params.email,
  }
  let tokenObject = await generateToken(14)

  await sendVerificationMail(req,res,userr,tokenObject.token)
return res.status(200) */
    const user = await User.findOne({where: {email: req.params.email }})
    // user is not found into database
    if (!user){
        return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
    }
    // user has been already verified
    else if (user.isVerified){
        return res.status(200).send('This account has been already verified. Please log in.');
    } 
    // send verification link
    // generate token and save
    try{
        // Send email (use credintials of SendGrid)
        let tokenObject = await generateToken(user.id)
        await sendVerificationMail(req,res,user,tokenObject.token)
    }
    catch(e){
        return res.status(500).send({msg:e.message});
    }
}