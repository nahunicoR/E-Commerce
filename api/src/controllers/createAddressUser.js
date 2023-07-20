const { Router } = require('express');
const { Address } = require('../db');
const {response} = require("../utils")

module.exports = async (req, res, next) => {
    const { mainstreet, number, postalcode, street1, street2, name, phonenumber, additionals, userEmail } = req.body;
    try {
        const newAddress = await Address.create({
            mainstreet,
            number,
            postalcode,
            street1,
            street2,
            name,
            phonenumber,
            additionals,
            userEmail
        });
        response(res,200,{
            Id_street : newAddress.id, 
            Id_user : newAddress.userId
        });
    } catch (error) {
        console.log(error)
        next(error);
    };
};