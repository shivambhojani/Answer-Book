import { userprofileService } from "../services/index.js";



// Get all users
const usersGET = async (req, res) => {
    try{
      const users = await userprofileService.getAllUsers();
      console.log(users);
  
      res.status(200).json({
        message: "ok",
        users,
      });
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  

// Get current logged in users
const currentUser = async (req, res) => {
    let email = req.query.email;
    try{
      const user = await userprofileService.getcurrentUser(email);
      console.log(user);
      res.status(200).json({
        status: true,
        user
      })
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  const getUserbyID = async (req, res) => {
    let id = req.query.id;
    try{
      const user = await userprofileService.getUserbyID(id);
      console.log(user);
      res.status(200).json({
        status: true,
        user
      })
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  //Update profile details for current user
  const updatecurrentUser = async (req, res) => {
    let email = req.query.email;
    console.log(email)
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let addressline1 = req.body.addressline1;
    let city = req.body.city;
    let mobile = req.body.mobile;
    let pincode = req.body.pincode;
    try{
      const updateuser = await userprofileService.updatecurrentUser(
        email, firstname, lastname, addressline1, city, mobile, pincode);
      const user = await userprofileService.getcurrentUser(email);
      res.status(200).json({
        status: true,
        user
      })
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  const makeactive = async (req, res) => {
    let email = req.query.email;
    console.log(email)
    try{
  
      const makeactive = await userprofileService.makeactive(email);
      const user = await userprofileService.getcurrentUser(email);
      res.status(200).json({
        status: true,
        user
      })
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  const makeinactive = async (req, res) => {
    let email = req.query.email;
    console.log(email)
    let firstname = req.body.firstname;
    try{
  
      const makeinactive = await userprofileService.makeinactive(email);
      const user = await userprofileService.getcurrentUser(email);
      res.status(200).json({
        status: true,
        user
      })
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  const updatePassword = async (req, res) => {
    console.log('Update Password Controller');
    let email = req.query.email;
    let oldPassword = req.body.oldpassword;
    let newPassword = req.body.newpassword;

    console.log(email)
    console.log(oldPassword)
    console.log(newPassword)
    // let firstname = req.body.firstname;
    try{
      const updatepassword = await userprofileService.updatePassword(email, oldPassword, newPassword);
      res.status(200).json({
        status: true,
        updatepassword
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  const uploadImage = async (req, res) => {
    let email = req.query.email;

    let imageb64 = req.body.image;
    console.log(email);
    try{
      const updateImage = await userprofileService.uploadImage(
        email, imageb64).then((response)=>{
          res.status(200).json({
            response
          })
        });
        
    }catch(err){
      console.log(err)
      res.status(500).json({
        message: "Internal Server Error",
        err
      });
    }
  };


// Post a new user
const postsUser = async (req,res) => {
    const user = req.body;
  
    console.log(user);
  
    try{
      const serviceResponse = await userprofileService.postUser(user);
  
      res.status(200).json({
        message: "ok",
      });
    }catch(err){
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  
  };
  
  const getImage = async (req, res) => {
    let email = req.query.email;

    try {
      const userImage = await userprofileService.getImage(email); //update the appreciaition of a user
  
      res.status(200).json({
        message: "ok",
        userImage
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
};

  export const userprofileController = {
    usersGET,
    postsUser,
    currentUser,
    updatecurrentUser,
    uploadImage,
    updatePassword,
    makeactive,
    makeinactive,
    getImage,
    getUserbyID
  };
  
  