const { User } = require("../db");

const updateUser = async (id) => {
    try {
        let detail = await User.findByPk(id);
        console.log(detail);
        
        return detail;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { updateUser };