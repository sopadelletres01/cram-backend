
require("dotenv/config");
const express = require("express");
const app = express();
require("./config")(app);
const { isAuthenticated } = require("./middlewares/authJwt"); // <== IMPORT
const authRoutes= require("./routes/auth.routes")



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cram application." });
});

const test = require('./routes/test')

// Register and set up the middleware
app.use('test',express.urlencoded({ extended: true }));

app.use('/test',test)

  // App routes - API
  const api = require('./routes/api')
//app.use('/api', api, authJwt.verifyToken) NECESARIO PARA TODAS LAS RUTAS (VERIFICA QUE EL USUARIO PROVIENE DEL LOGIN DE NUESTRA APP)
app.use('/api',isAuthenticated, api)
app.use('/api/auth',authRoutes )
//Verify authJWT

// set port, listen for requests
app.set("port",process.env.PORT || 8080);

module.exports = app;
