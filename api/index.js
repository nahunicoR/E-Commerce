//Librerías para cloudinary
const cloudinary = require("./cloudConfig");
const uploader = require("./multerCloud");

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;

// Create Date: december 8, 2022
// Author: Alejandro Téllez

// Description: Para levantar el servidor
// Probar en postman o navegador: http://localhost:3001/cloudinary
server.get('/cloudinary', (req, res) => {
  res.send(`%s listening at ${port}`)
});

//Se genera la ruta del post
server.post("/cloudinary/upload", uploader.single("file"), async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  return res.json({
    success: true,
    file: upload.secure_url,
  });
});


// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
