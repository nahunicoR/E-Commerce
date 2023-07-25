const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    check('name')
    .trim()
    .notEmpty()
    .isAlpha()
    .toLowerCase()
    .escape()
    .withMessage('El campo no puede ir vacio y no puede contener caracteres especiales'),
    check('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('No parece ser un email'),
    check('password')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength({min: 6, max: 10})
    .escape()
    .withMessage('El password debe contener como minimo 6 caracteres o un maximo de 10'),
    (req, res, next) =>{
        validateResult(req, res, next);
    }
];

module.exports = { validateCreate }