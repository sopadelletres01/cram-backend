const cloudinary = require('../config/cloudinary')
const streamifier = require('streamifier')
const {User} = require("../models");


updateUserAvatar = async (req,res,next) => {
  //Upload file
  try{
    const userId = req.params.id
    const {file} = req
    console.log("FILE",file)
    console.log("userId",userId)
    
    let user = await User.findByPk(userId)

    console.log("user",user)

    if(!user){
      return res.status(404).send({message:"User not found"})
    }

    let fileData = await uploadFile(req,res,next)
    console.log("fileData",fileData)

    user.set({
      avatar_src: fileData.url,
    });

    console.log("userUpdated",user)
    await user.save();

    console.log("userUpdated",user)
    return res.status(200).send({message:"File updated correctly",avatar_src:user.avatar_src})
    //Get the user with the selected id
  }
  catch(e){
    return res.status(500).send({message:e})
  }


  //Update the avatar_src of the user
}



uploadFile = (req,res,next) => {

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    return result;
    //console.log(result);
  }

  return upload(req);
} 

module.exports = {
  updateUserAvatar,
  uploadFile
};
