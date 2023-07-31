const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateLogin = [
    check('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('El email es invalido'),
    check('password')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .escape()
    .withMessage('El password es obligatorio'),
    (req, res, next) =>{
        validateResult(req, res, next);
    }
];

module.exports = { validateLogin }