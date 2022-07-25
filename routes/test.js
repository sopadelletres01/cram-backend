'use strict';

const express = require('express');
var router = express.Router();
const multer = require('multer');
const fileUpload = multer();

//Import controllers

router.post('/events', fileUpload.single('image'), (req, res) => {
  let body = req.body;
  console.log('body', body);
  let userPicture = req.file;
  console.log('body', userPicture);
  res.status(200).send(`
      Your username is: ${body.name}
      Uploaded image name is: ${userPicture.originalname}
    `);
});

router.get('/events', (req, res) => {
  console.log('Estoy aki', req);
});

module.exports = router;
