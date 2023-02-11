import multer from "multer";

const Storage = multer.diskStorage({
   
    destination:function (req, file, cb){
        cb(null, './Images')
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

const upload = multer({
    storage: Storage,
});

export default upload;
