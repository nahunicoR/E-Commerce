
//Librerías para cloudinary
const cloudinary = require("../services/cloudConfig");

/* Date Creation: January 5, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea servicio para cargar imagen a cloudinary
*/

//Para subir una imagen
const  uploadImage = async (filePath) => {
    let images = []
 
    try {
      //Sube la imagen de enviada en el path, {folder: "ecommerce" } Indica la carpeta en cloudinary
      let imageUpload = await cloudinary.v2.uploader.upload(filePath,{folder: "ecommerce" })  
      //La imagen subida retorna el lugar donde está guardada la imagen y la url que se debe almacenar 
      images.push( {
        folder: imageUpload.public_id,
        secure_url: imageUpload.secure_url });
        console.log(images)
       
        return ({ message: "Carga completa",
        data: images})
     
     } catch (e) {Message : "Límite excedido, deben ser 15 MB."}  
   
 }

  module.exports = { uploadImage };
