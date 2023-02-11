/**
 * @author aman singh bhandari
 */
import mongoose from "mongoose";
const { Schema } = mongoose;

const offer_appreciationSchema = new Schema({
  //must match with schema of the collection

  likesScore: Number,
  commentsScore: Number,
  bestAnswerScore: Number,
  postsScore: Number,
});

export default mongoose.model("offer_appreciations", offer_appreciationSchema);
