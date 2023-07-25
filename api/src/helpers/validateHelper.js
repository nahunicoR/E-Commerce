const { validationResult }  = require('express-validator');

const validateResult = (req, res, next) =>{
    try {
        // Resultado de todas las validaciones
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(400).send({errors: error.mapped()});
    }
}

module.exports = { validateResult }