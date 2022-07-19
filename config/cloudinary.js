const cloudinary = require('cloudinary').v2;
require('dotenv').config()


console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)
console.log(process.env.CLOUDINARY_CLOUD_NAME)

//reading the cloudinary values from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


module.exports = cloudinary;