const fs = require("node:fs");

exports.saveImage = (file)=>{
    const newPath =`public/uploads/${file.originalname}`;
    fs.renameSync(file.path,newPath);
    return newPath;
}