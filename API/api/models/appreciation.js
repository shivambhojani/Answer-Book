/**
 * @author aman singh bhandari
 */
import mongoose from "mongoose";
const { Schema } = mongoose;

const appreciationSchema = new Schema({
  //must match with schema of the collection
  userId: Schema.Types.ObjectId,
  likesScore: Number,
  commentsScore: Number,
  bestAnswerScore: Number,
  postsScore: Number,
  badge: String,
});

export default mongoose.model("appreciation", appreciationSchema);
