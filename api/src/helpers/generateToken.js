const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// Generar token del objeto user
const tokenSign = (user)=>{
    return jwt.sign({
        id: user.id,
        rol: user.rol
      },
        JWT_SECRET, 
    { expiresIn: '1h' }
    );
}

// Verificar token
const verifyToken = (token)=>{
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = {
    tokenSign,
    verifyToken
}