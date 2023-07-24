
//Librerías para cloudinary
const cloudinary = require("../services/cloudConfig");
const { Image } = require("../db");
const {response} = require("../utils");

module.exports = async (req,res,next) => {
  const {id} = req.params;
  try {
    const imageDb = await Image.findByPk(id);
      if (imageDb){
        // carpeta con el nombre de imagen donde se encuentra
        const imageCloud = await imageDb.destroy(); // borra la imagen de la base de datos
        // const imageDeleted = await cloudinary.v2.uploader.destroy(imageDb.public_id); //Elimina imagen de cloudinary
      };
    return response(res,200,`Se elimino la imagen id: ${id}`);
  } catch (error) {
    next(error);
  };
};