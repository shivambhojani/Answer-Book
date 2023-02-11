import bcrypt from "bcrypt";
import { AuthUser } from "../models/index.js";
import { appreciationService } from "../services/index.js";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const loginService = async ({ email, password }, res) => {
  console.log("email from client====" + email);
  console.log("password from client====" + password);

  try {
    const savedUser = await AuthUser.findOne({ email: email });
    console.log(savedUser);

    if (savedUser != null) {
      const isMatch = await bcrypt.compare(password, savedUser.password);
      console.log("here");

      const token = jwt.sign(email, "Kuldeep");

      if (isMatch) {
        console.log("success.");
        console.log(token);
        return { message: "ok", token }; // what to return if user is not register.
      } else {
        return { message: "Password doesn't match", token: "" }; // what to return if user is not register.
      }
    } else {
      return { message: "User doesn't exsist", token: "" }; // what to return if user is not register.
    }
  } catch (err) {
    console.log(err);
  }
};

const registerService = async (
  { firstname, lastname, email, password, confirmpassword },
  res
) => {
  const savedUser = await AuthUser.findOne({ email });
  const token = jwt.sign(email, "Kuldeep");

  if (savedUser) {
    res.status(422).json({
      message: "user already exist",
    });
    // how to return status 422 , if user exist
  } else {
    const hpassword = await bcrypt.hash(password, 12);
    console.log("hashed pass:", hpassword);
    const user = new AuthUser({
      firstname,
      lastname,
      email,
      password: hpassword,
      employeeId: "",
      addressline1: "",
      mobile: "",
      city: "",
      pinCode: "",
      profilePicture: "",
      isActive: true,
      subscribedTo: [],
      bookmarkLists: [],
    });
    user.save(async (err, data) => {
      if (err) {
        res.status(500).json({
          message: "user save failed",
        });
        console.log(err);
      } else {
        delete data["password"];
        res.status(200).json({
          message: "OK",
          data,
          token,
        });
        console.log("===== User saved ====== " + data);

        const savedUser = await AuthUser.findOne({ email });
        console.log("_id:::registration" + savedUser._id);
        await appreciationService.createAppreciation(savedUser._id);
      }
    });

    // console.log("email:::registration" + email);
  }
};

const fpService = async ({ email, password }) => {
  const hp = await bcrypt.hash(password, 12);
  const savedUser = await AuthUser.findOne({ email: email });
  if (savedUser) {
    AuthUser.updateOne({ email: email }, { password: hp }, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "user update failed",
        });
        console.log(err);
      } else {
        res.status(200).json({
          message: "OK",
          data,
        });
        console.log("updated.");
        console.log(data);
      }
    });
  } else {
    return { message: "User doesn't exsist" };
  }
};

const requestForgotPassword = async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, "asdfghjklzxcvbnm", {
    expiresIn: "24h",
  });
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "kuldeepbhimani007@gmail.com", // Change to your verified sender
    subject: "Password reset link",
    text: `https://answerbook-group6.herokuapp.com/reset-password/${token}`,
  };
  const savedUser = await AuthUser.findOne({ email: req.body.email });
  if (savedUser != null) {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(200).json({
          success: true,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      });
  } else {
    return res.status(500).json({
      success: false,
      message: "User doesn't exsist",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const payload = jwt.verify(req.body.token, "asdfghjklzxcvbnm");
    if (payload && payload.email) {
      const savedUser = await AuthUser.findOne({ email: payload.email });
      if (!savedUser) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
      const hp = await bcrypt.hash(req.body.password, 12);
      savedUser.password = hp;
      savedUser.save();
      return res.status(200).json({
        success: true,
        user: savedUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const snsNotify = async (req, res) => {
  // var params = {
  //   Message: "You have created a post on AnswerBook.",
  //   TopicArn: "arn:aws:sns:us-east-1:309204736680:notifications",
  //   Endpoint: req.params.email,
  // };

  // var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
  //   .publish(params)
  //   .promise();

  // publishTextPromise
  //   .then(function (data) {
  //     console.log(`Message ${params.Message} sent.`);
  //     console.log(`MessageID is` + data.MessageId);
  //   })
  //   .catch(function (err) {
  //     console.error(err, err.message);
  //   });

  console.log(req.params.email);
};

export const authService = {
  loginService,
  registerService,
  fpService,
  requestForgotPassword,
  resetPassword,
  snsNotify,
};
