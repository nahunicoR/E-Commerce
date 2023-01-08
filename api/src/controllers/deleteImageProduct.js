/* Date Creation: January 6, 2023
   Author: Alejandro Téllez Aguilar
   Description: Crea servicio para eliminar una imagen del producto
*/

//Librerías para cloudinary
const cloudinary = require("../services/cloudConfig");
const { Image } = require("../db");

const deleteImageProduct = async (id) => {
    try {

        const imageDb = await Image.findByPk(id);
        console.log(id);
          if (imageDb) {
            // carpeta con el nombre de imagen donde se encuentra
          
            const imageCloud = await imageDb.destroy(); // borra la imagen de la base de datos
            const imageDeleted = await cloudinary.v2.uploader.destroy(imageDb.public_id); //Elimina imagen de cloudinary
            console.log(imageCloud);

          }

        return `Se elimino la imagen id: ${id}`;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteImageProduct };