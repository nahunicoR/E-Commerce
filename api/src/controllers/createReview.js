const { Review } = require('../db');
const {response} = require("../utils");

module.exports = async (req, res, next) => {
    const { body } = req;
    try {
            const [review, created] = await Review.findOrCreate({
            where:{
                description: body.input.description,
                rating:body.currentValue,
                productId: body.input.productId,
                userEmail:body.input.userEmail.email
            }
        })
        !created ? response(res,400,'La review ya existe') : response(res,200,review);
    } catch (error) {
        next(error);
        response(res,400,error.message);
    };
};