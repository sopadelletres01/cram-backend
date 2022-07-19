'use strict'

const express = require('express')
var router = express.Router()
const multer = require("multer");
const fileUpload = multer()

//Import controllers

router.post("/eventos",fileUpload.single('image'), (req, res) => {
    let body = req.body
    console.log("body",body)
    let userPicture = req.file;
    console.log("body",userPicture)
    res.status(200).send(`
      Your username is: ${body.nombre}
      Uploaded image name is: ${userPicture.originalname}
    `);
  });


router.get("/eventos",(req,res)=>{
    console.log("Estoy aki",req)
})

module.exports = router