const { Address } = require("../db");

const deleteAddressUSer = async (id) => {
    try {
        let detail = await Address.destroy({
            where: {
                id
            }
        })
        return `Se elimino el domicilio con id: ${detail}`;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { deleteAddressUSer };