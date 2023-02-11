import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: ObjectId,
  topic: String,
  body: String,
  tags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  type: String,
  reactions: [
    {
      emoji: String, // String name of reaction
      by: String, // String of persons name
      id: String,
    },
  ],
});

export default mongoose.model("post", postSchema);
