const {Sequelize,sequelize} = require("../models/db");
const {User,Token, Rol, Usu_comercio} = require("../models");
const config = require("../config/auth");
const smtpTransport = require("../config/mail")
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const Op = Sequelize.Op;

async function generateToken(usuario){
  // generate token and save
  var token = await Token.create({ token: crypto.randomBytes(16).toString('hex'), usuario_id: usuario.id, fecha_expiracion: Date.now() + 3600});
  console.log("token",token.token)
  if (!token){
    throw new Error("El token no se pudo crear correctamente...")
  }
  return token
}

async function sendVerificationMail(req,res,usuario,token,type="account"){
  // Send email (use credintials of SendGrid)
  if ( !usuario ) throw new Error("QUe usuario ni que usuario")
  console.log("TOKEN",token)
  if ( type==="account" ){
    var mailOptions = { 
      from: 'cram.testing@gmail.com', 
      to: usuario.email, 
      subject: 'Account Verification Link',
      text: 'Hello '+ usuario.nombre +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/' + '\/confirmation\/' + usuario.email + '\/' + token.token + '\n\nThank You!\n' 
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) { 
        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
      }
      return res.status(200).send('A verification email has been sent to ' + usuario.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
    });
  }
  if ( type==="forgot" ){
    var mailOptions = { 
      from: 'cram.testing@gmail.com', 
      to: usuario.email, 
      subject: 'Password reset link',
      text: 'Hello '+ usuario.nombre +',\n\n' + 'Please reset your password by clicking the link: \nhttp:\/\/' + "65.108.245.5" +  '\/forgot' + '\/' + 'reset\/' + usuario.id + '\/' + token.token + '\n\nThank You!\n' 
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) { 
        return res.status(500).send({msg:'Technical Issue!, Please click on resend for resetting your password.'});
      }
      return res.status(200).send('A password reset email has been sent to ' + usuario.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
    });
  }
}


exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.findOne({where:{dni:req.body.dni}})

    if ( user.password !== null ) {
      return res.status(400).send({message:"El usuario con este dni ya esta registrado en nuestra aplicacion..."})
    }

    const passwordIsValid = req.body.password===req.body.rep_password
    if( !passwordIsValid ){
      res.status(403).send({message: "Passwords are not the same"})
    }

    console.log("USERDNI",user)
    if (!user){
      return res.status(404).send({message:"No user with matching dni was found"})
    }

    const usuario = await user.update({
        password: bcrypt.hashSync(req.body.password, 8),
        token_activado:0
    });
    
    console.log("updatedUser",usuario)

    if ( !user ) throw new Error("No se ha podido crear el usuario")
    let tokenObject = await generateToken(user)
    await sendVerificationMail(req,res,user,tokenObject)
    if (user) res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
exports.signin = async (req, res) => {
  try {
    /* if ( req.session.user ){
      return res.send({auth: true, user: req.session.user})
    } */
    const usuario = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!usuario) {
      return res.status(404).send({ auth: false, message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      usuario.password
    );
    if (!passwordIsValid) {
      return res.status(403).send({
        auth: false,
        message: "Invalid Password!",
      });
    }
    if (!usuario.token_activado){
      return res.status(401).send({auth: false,message:'Your Email has not been verified. Please click on resend'});
    } 
    const token = jwt.sign({ id: usuario.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    console.log("TOKEN",token)

    let comercio_usu = await Usu_comercio.findOne({where:{usuario_id:usuario.id}})
    console.log("USUARIO",usuario)
    console.log("COMERCIO USU",comercio_usu)

    let usuarioData = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol_id ?? 1,
      token:token,
      token_activado: usuario.token_activado ?? null,
      avatar_src:usuario.avatar_src,
      comercio_id:comercio_usu?.comercio_id ?? null
    }
    req.session.user = usuarioData;
    /*let authorities = [];
    const roles = await usuario.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    } */
    console.log("ROL",usuario.rol)
    return res.status(200).send({
      data:{
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol_id ?? 1,
        apellidos: usuario.apellidos ?? null,
        localidad: usuario.localidad ?? null,
        fecha_nacimiento: usuario.fecha_nacimiento ?? null,
        codigo_postal:usuario.codigo_postal ?? null,
        comercio_id:comercio_usu?.comercio_id ?? null,
        dni: usuario.dni ?? null,
        telefono: usuario.telefono ?? null,
        avatar_src: usuario.avatar_src ?? null,
        token_activado: usuario.token_activado ?? null,
      },
      auth: true,
      token:token,
      //roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ auth: false, message: error.message });
  }
};
exports.signout = async (req, res) => {
  try {
    req.session = null;
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

    let token = await Token.findOne({where:{ usuario_id: user.id }});
    if (!token) {
        token = await generateToken(user)
    }
    await sendVerificationMail(req,res,user,token,"forgot")

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

    let tokenToFind = await Token.findOne({where:{ token: token, usuario_id: id }});
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
    const token = await Token.findOne({ where: { token: req.params.token } })
    // token is not found into database i.e. token may have expired 
    if (!token) {
        return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
    }
    // if token is found then check valid user 
    else {
        const user = await User.findByPk(token.usuario_id)
        // not valid user
        console.log("USER ",user)
        if (!user) {
            return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        }
        // user is already verified
        else if (user.token_activado) {
            return res.status(200).send('User has been already verified. Please Login');
        }
        // verify user
        else {
            // change isVerified to true
            // destroy verification token ?
            try{
                //await token.destroy()
                await user.update( 
                    {token_activado:1}
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
    const user = await User.findOne({where: {email: req.params.email }})
    // user is not found into database
    if (!user){
        return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
    }
    // user has been already verified
    else if (user.token_activado){
        return res.status(200).send('This account has been already verified. Please log in.');
    } 
    // send verification link
    // generate token and save
    try{
        // Send email (use credintials of SendGrid)
        let tokenObject = await generateToken(user)
        await sendVerificationMail(req,res,user,tokenObject)
    }
    catch(e){
        return res.status(500).send({msg:e.message});
    }
}