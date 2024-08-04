const fs = require("node:fs");

exports.saveImage = (file)=>{
    const newPath =`uploads/${file.originalname}`;
    fs.renameSync(file.path,'public/'+newPath);
    return newPath;
}