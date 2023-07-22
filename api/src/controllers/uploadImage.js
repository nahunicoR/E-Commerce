
const cloudinary = require("../services/cloudConfig");
const { Image } = require('../db');

const  uploadImage = async (filePath, productId) => {
    
    console.log(productId);
    try {
       let imageUpload = await cloudinary.v2.uploader.upload(filePath,{folder: "ecommerce" })  
       let newImage = await Image.create({
       productId: productId,  
       public_id: imageUpload.public_id,
       url: imageUpload.secure_url
     });
        return ({ message: "Carga completa"})
     } catch (e) {Message : "Límite excedido, deben ser 15 MB."}  
     
 }

  module.exports = { uploadImage };
