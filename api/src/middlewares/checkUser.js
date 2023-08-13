const { verifyToken } = require('../helpers/generateToken');
const { User } = require('../db');
const { response } = require('../utils');

const checkSessionUser = async( req ,res ,next )=>{
    try {

        const token = req.headers.cookie?.split('=').pop();
       
        if(!token) return response(res, 401, { msg: "Debes iniciar sesion" });

        const tokenData = verifyToken(token);
       
        const userData = await User.findByPk(tokenData.id);
        
        if(!userData) return response(res, 401, { msg: "El usuario no existe" });

        req.body.userId = userData.id;

        if (userData.rol === 'user') return next();  
        
        return response(res, 401, { msg: "El administrador no puede hacer una review" });
            
    } catch (e) {
        next(e);
    }
}
  
module.exports = {checkSessionUser};