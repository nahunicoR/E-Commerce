const { User } = require("../db");
const {response} = require("../utils");

module.exports = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        
        const newUser = {
			name,
            email,
            password
		};
        
        // Verificar que el usuario no este duplicado y Registrar nuevo usuario
        const [user, created] = await User.findOrCreate({
			where: {
				name,
                email,
                password
			},
            defaults: newUser
		});
        if (!created) return response(res,400,{msg:"El usuario ya existe"});
		response(res,200,user);

    } catch (error) {
        next(error);
    };
};