const { Address } = require("../db");
const {response} = require("../utils");

module.exports = async (req,res,next) => {
    const {id, userEmail} = req.query;
    try {
        const street = await Address.findOne({
            where: {
                id: id,
                userEmail: userEmail
            },
            });
            if (street) {
            await street.destroy(); // deletes the row
            }
        return response(res,200,`Se elimino el domicilio con id: ${id} y usuario: ${userEmail}`);
    } catch (error) {
        next(error);
    };
};