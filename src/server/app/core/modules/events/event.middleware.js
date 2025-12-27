import { error } from "console";
import multer from "multer";
import path from 'path';
const fileStorage =  multer.memoryStorage();
const fileFilter = (req,file,callBack) =>{
    const allowedMime = ["image/jpeg","image/png","image/webp","image/gif"];
    const allowedExten = "/webp|jpeg|jpg|gif|png/";
    const fileExten = allowedExten.test(path.extname(file.originalname).toLocaleLowerCase());
    const fileMime = allowedMime.includes(file.mimetype);
    if(fileExten && fileMime)
    {
        return callBack(null,true);
    }   
    else{
        callBack(new error('Error:Only jpg,jpeg,webp,gif and png are allowd'));
    }
};
const uploader = multer({
    storage:fileStorage,
    limits:{
        fileSize:10*1024*1024,
        files:1,
        fields:10
    },
    fileFilter:fileFilter
});

export default uploader;