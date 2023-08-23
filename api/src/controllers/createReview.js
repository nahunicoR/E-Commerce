const { Review } = require('../db');
const {response} = require("../utils");

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
	    const { description, rating } = req.body;
        const userId = req.body.userId;
        
            const [review, created] = await Review.findOrCreate({
            where:{
                productId: id,
                userId
            },
            defaults: {
                description,
                rating
            }
        })
        !created ? response(res,400,'La review ya existe') : response(res,200,review);
    } catch (error) {
        next(error);
        response(res,400,error.message);
    };
};