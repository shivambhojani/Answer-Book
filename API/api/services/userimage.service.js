import Image from "../models/userimage.model.js";
import multer from "multer";
import fs from "fs";

const uploadImage = async (email) => {
    console.log('user service')
    var user;
  
    try {
        const saveImage = new Image({
            email: email,
            image:{
                data: fs.readFileSync("uploads/" + email),
            }
        })
      return user;
    }
    catch (error) {
      user = await User.find();
    };
  }

export const userImageService = {
    uploadImage
  };