/*
 * @author: Shivam Bhojani
 * @description: Routes for profile management
 */

import { Router } from "express";
import { userprofileController } from "../controllers/index.js";
import multer from "multer";
import Image from "../models/userimage.model.js";
import fs from "fs";

const userprofileRoute = Router();

userprofileRoute.get("/", userprofileController.usersGET);

userprofileRoute.get("/currentuser", userprofileController.currentUser);

userprofileRoute.put("/currentuser", userprofileController.updatecurrentUser);

userprofileRoute.put("/changepassword", userprofileController.updatePassword);

userprofileRoute.put("/makeactive", userprofileController.makeactive);

userprofileRoute.put("/makeinactive", userprofileController.makeinactive);

userprofileRoute.post("/uploadImage", userprofileController.uploadImage);

userprofileRoute.get("/getprofileImage", userprofileController.getImage);

userprofileRoute.get("/getuserbyid", userprofileController.getUserbyID);


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// userprofileRoute.post(
//   "/uploadImage",
//   upload.single("testImage"),
//   (req, res) => {
//     const saveImage = new Image({
//       email: req.body.email,
//       image: {
//         data: fs.readFileSync("images/" + req.file.filename),
//         contentType: "image/png",
//       },
//     });
//     saveImage
//       .save()
//       .then((res) => {
//         console.log("image is saved");
//       })
//       .catch((err) => {
//         console.log(err, "error has occur");
//       });
//     res.send("image is saved");
//   }
// );
// userprofileRoute.get("/getprofileImage", async (req, res) => {
//   let email = req.query.email;
//   const imageData = await Image.findOne({ email: email });
//   res.json(imageData);
// });

export default userprofileRoute;
