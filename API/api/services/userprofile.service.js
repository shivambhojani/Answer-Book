import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import Image from "../models/userimage.model.js";

const getAllUsers = async () => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "userimage1",
        localField: "email",
        foreignField: "email",
        as: "images",
      },
    },
    { $unwind: { path: "$images", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        $or: [
          { "images.email": "subscribedUsers.email" },
          { "images.0": { $exists: false } },
        ],
      },
    },
  ]);
  // const users = await User.find();
  return users;
};

const getcurrentUser = async (email) => {
  console.log("user service");
  var user;

  try {
    user = await User.findOne({ email: email });

    // user = user.filter((user) => user.email == email)

    return user;
  } catch (error) {
    user = await User.find();
  }
};

const getUserbyID = async (id) => {
  console.log("user service");
  var user;

  try {
    user = await User.findOne({ _id: id });

    // user = user.filter((user) => user.email == email)

    return user;
  } catch (error) {
    user = await User.find();
  }
};

const updatePassword = async (email, oldPassword, newPassword) => {
  console.log("update Password Service");
  const user = await getcurrentUser(email);
  try {
    const holdpassword = await bcrypt.hash(oldPassword, 12);
    const validOldPassword = await bcrypt.compare(oldPassword, user.password);
    console.log("validOldPassword", validOldPassword);
    if (validOldPassword) {
      console.log("Old Password is Valid");
      const hpassword = await bcrypt.hash(newPassword, 12);
      console.log("new hash", hpassword);
      const updatePassword = User.updateOne(
        { email: email },
        {
          $set: {
            password: hpassword,
          },
        }
      );
      return updatePassword;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const uploadImage = async (email, imageb64) => {
  console.log("Upload Image Service");
  const userImage = await getImage(email);
  if (userImage) {
    const updateImage = Image.updateOne(
      { email: email },
      {
        $set: {
          image: imageb64,
        },
      }
    )
      .then((response) => {
        console.log("Image uploaded complete");
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } else {
    const newImage = new Image({
      email: email,
      image: imageb64,
    });
    newImage
      .save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
    return newImage;
  }
};

const getImage = async (email) => {
  console.log("Get Image Service");
  console.log(email);
  try {
    const userImage = await Image.findOne({ email: email });
    return userImage;
  } catch (error) {
    return error;
  }
};

const makeactive = async (email) => {
  const user = await getcurrentUser(email);
  console.log("User Email", email);
  if (user.isActive === false) {
    console.log("User Active", user.isActive);
    const makeuseractive = User.updateOne(
      { email: email },
      {
        $set: {
          isActive: true,
        },
      }
    );
    const user1 = await getcurrentUser(email);
    console.log("User Active", user1.isActive);
    return makeuseractive;
  }
};

const makeinactive = async (email) => {
  const user = await getcurrentUser(email);
  console.log("User Email", email);
  console.log("User Active", user.isActive);
  if (user.isActive === true) {
    console.log("User Active", user.isActive);
    const makeuseractive = User.updateOne(
      { email: email },
      {
        $set: {
          isActive: "false",
        },
      }
    );
    const user1 = await getcurrentUser(email);
    console.log("User Active", user1.isActive);
    return makeuseractive;
  }
};

const updatecurrentUser = async (
  email,
  firstname,
  lastname,
  addressline1,
  city,
  mobile,
  pincode
) => {
  const finduser = await User.findOne({ email: email });

  if (finduser) {
    let newfirstname = firstname;
    console.log("newfirstname", newfirstname);
    const updateuser = User.updateOne(
      { email: email },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          addressline1: addressline1,
          city: city,
          mobile: mobile,
          pincode: pincode,
        },
      }
    );
    // userafterupdate = await User.findOne({ email: email });
    return updateuser;
  }
};

const postUser = async () => {
  const newUser = await User.create(user);

  await newUser.save();

  console.log(newUser);
};

export const userprofileService = {
  getAllUsers,
  postUser,
  getcurrentUser,
  updatecurrentUser,
  updatePassword,
  makeactive,
  makeinactive,
  uploadImage,
  getImage,
  getUserbyID,
};
