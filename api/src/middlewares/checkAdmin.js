const { verifyToken } = require('../helpers/generateToken');
const { User } = require('../db');
const { response } = require('../utils');

const checkAdminAuth = async( req ,res ,next )=>{
    try {
        const token = req.headers.cookie?.split('=').pop();

        const tokenData = verifyToken(token);
        
        const userData = await User.findOne({where: {id: tokenData.id}});
        
        if (userData.rol === 'admin') return next();  
        
        return  response(res, 401, { msg: "No tienes permisos necesarios" });
            
    } catch (e) {
        next(e);
    }
}
  
module.exports = {checkAdminAuth};