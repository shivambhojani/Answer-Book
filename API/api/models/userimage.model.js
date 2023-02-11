import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
    email:{
        type:String,
    },
    image:{
        type:String,
    },
})

const Image = mongoose.model("UserImage1", ImageSchema);
export default Image;