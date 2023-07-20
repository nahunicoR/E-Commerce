const { User } = require("../db");
const {response} = require("../utils");

module.exports = async (req,res,next) => {
    const {useremail} = req.params;
    const { rol} = req.body;
    try {
        const update = await User.findByPk(useremail);
        update.rol = rol;
        await update.save()
        response(res,200,{
            message: 'Actualizacion de Usuario exitosa',
            usuario: update.name,
            nuevo_rol: update.rol,
        });
    } catch (error) {
        console.log(error);
        next(error);
    };
};
