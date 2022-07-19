const express = require("express");

const cors = require("cors");

const app = express();

const path = require('path');

const cookieSession = require("cookie-session");

const { verifySignUp, authJwt } = require("./middlewares");
const auth = require("./controllers/auth");


app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cram application." });
});


const multer = require("multer");

const test = require('./routes/test')

// Register and set up the middleware
app.use('test',express.urlencoded({ extended: true }));

app.use('/test',test)





//Set up cookie
app.use(
  cookieSession({
    name: "cram-session",
    // keys: ['key1', 'key2'],
    secret: process.env.SECRET_COOKIE, // should use as secret environment variable
    httpOnly: true
  })
  );
  // App routes - API
  const api = require('./routes/api')
//app.use('/api', api, authJwt.verifyToken) NECESARIO PARA TODAS LAS RUTAS (VERIFICA QUE EL USUARIO PROVIENE DEL LOGIN DE NUESTRA APP)
app.use('/api', api)
app.use('/api', express.urlencoded({extended: true}))
app.use('/api', express.json())

//Verify authJWT

// set port, listen for requests
app.set("port",process.env.PORT || 8080);

module.exports = app;
