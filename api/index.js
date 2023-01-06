//Librerías para cloudinary
const cloudinary = require("./src/services/cloudConfig");
const uploader = require("./src/services/multerCloud");

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;
var images = [];


// Create Date: december 8, 2022
// Author: Alejandro Téllez

// Description: Para levantar el servidor
// Probar en postman o navegador: http://localhost:3001/cloudinary
server.get('/cloudinary', (req, res) => {
  res.send(`%s listening at ${port}`)
});

//Se genera la ruta del post

  
//   const upload = await cloudinary.v2.uploader.upload(req.file.path);
 
 
//   return res.json({
//     success: true,
//     file: upload.secure_url,
//     data: "Imagen ha sido cargada",
//   });
// });




//Para varias imagenes en temporal
//server.post("/cloudinary/upload", uploader.array("files"), uploadFiles);

async function uploadFiles (req, res) {
   let imagesUploaded = [];
  console.log(req.files);
    //Para subir imagenes a claudinary
    await req.files.forEach(element => { // element es igual a cada imagen
      let imageUpload = uploadImage(element.path);
      // imagesUploaded.push(imageUpload);
      //console.log(element.path);
    })
    
    res.json({ message: "Successfully uploaded files",
              data: images});
}

//Para subir una imagen
async function uploadImage(filePath) {
  
  let imageUpload = await cloudinary.v2.uploader.upload(filePath,{folder: "ecommerce" })  
     //Carpeta en Cloudinary donde serán almacenadas las imagenes
  images.push( {
    folder: imageUpload.public_id,
    secure_url: imageUpload.secure_url });
    console.log(images)
     
return images
}

// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
