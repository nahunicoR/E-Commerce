const { User } = require("../db");

const updateUser = async (useremail) => {
    try {
        let detail = await User.findByPk(useremail);
        console.log(detail);
        
        return detail;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { updateUser };
