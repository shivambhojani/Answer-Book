import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: "string",
  },
  lastname: {
    type: "string",
  },
  email: {
    type: "string",
  },
  password: {
    type: "string",
  },
  employeeId: {
    type: "string",
  },
  addressline1: {
    type: "string",
  },
  mobile: {
    type: "string",
  },
  city: {
    type: "string",
  },
  pinCode: {
    type: "string",
  },
  oldPost: [
    {
      type: ObjectId,
    },
  ],
  profilePicture: {
    type: "string",
  },
  isActive: {
    type: "boolean",
    default: true,
  },
  subscribedTo: [
    {
      type: ObjectId,
    },
  ],
  bookmarkLists: [
    {
      bookmarkListName: String,
      postIds: [
        {
          type: String,
        },
      ],
    },
  ],
});

export default mongoose.model("user", UserSchema);
