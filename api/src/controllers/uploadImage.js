
//Librerías para cloudinary
const cloudinary = require("../services/cloudConfig");
const { Image } = require('../db');


/* Date Creation: January 5, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea servicio para cargar imagen a cloudinary
*/

//Para subir una imagen
const  uploadImage = async (filePath, productId) => {
    
    console.log(productId);
    try {
      //Sube la imagen de enviada en el path, {folder: "ecommerce" } Indica la carpeta en cloudinary
      let imageUpload = await cloudinary.v2.uploader.upload(filePath,{folder: "ecommerce" })  
      //Elimina el archivo de temmporal
      
      //La imagen subida retorna el lugar donde está guardada la imagen y la url que se debe almacenar 
      let newImage = await Image.create({
         productId: productId,  
         public_id: imageUpload.public_id,
         url: imageUpload.secure_url
     });
        
        
       
        return ({ message: "Carga completa"})
     
     } catch (e) {Message : "Límite excedido, deben ser 15 MB."}  
     
 }

  module.exports = { uploadImage };
