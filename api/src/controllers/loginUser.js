const { User } = require('../db');
const { response } = require('../utils');
const { tokenSign } = require('../helpers/generateToken');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if(!user) return response(res, 400, { msg: "El usuario no existe" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return response(res, 400, { msg: "El password es incorrecto" });

    // Si el usuario fue encontrado en la base de datos, se genera el token
    const token = tokenSign(user);

    // Almacenar el token en una cookie con un tiempo de expiración de 1 hora
    res.cookie('_token', token, {
      httpOnly: true, // Para evitar que el token sea accesible desde el lado del cliente mediante JavaScript
      maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (1 hora)
      sameSite: 'strict', // Solo enviar la cookie en peticiones del mismo sitio
    });
    return response(res, 200, { msg: "Inicio de sesion correcto" });
  } catch (error) {
    next(error);
  }
};