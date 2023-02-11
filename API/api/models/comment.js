import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: ObjectId,
  postId: ObjectId,
  content: String,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  isBestAnswer: Boolean,
});

export default mongoose.model("comments", commentSchema);
