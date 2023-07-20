// const { Review } = require("../db");
// const { User } = require('../db');
// const { Product } = require('../db')

/**CONTROLADOR PARA USAR CON BULKCREATE */

// const getAllReviewDB = async (productId) => {
   
//     try {
//         const reviewsDb = await Review.findAll({
//             where:{
//                 productId:productId,
//                 // userEmail:userEmail
//             }
//         });

//         let rev = await reviewsDb?.map( rev => {
//             return {
//                 id: rev.id,
//                 description: rev.description,
//                 rating: rev.rating,
//                 productId: rev.productId,
//                 userEmail: rev.userEmail
//             }
//         })
//         return rev;
//     } catch (error) {
//         console.log(error);
//     }
// }

const { Router } = require('express');
// const  objReview  = require('../controllers/objReview');
// const {getAllReviewDB} = require('../controllers/getAllReviewDB');
const {Review} = require('../db');
const {response} = require("../utils");

module.exports = async (req, res, next) => {
	const { id } = req.params;
	if(parseInt(id) === 0) {
		try {
			const reviews = await Review.findAll({
				attributes: {exclude: ['userEmail']},
				order:[['id','DESC']]
			});
			return response(res,200,reviews);
		} catch (error) {
			response(res,400,error);
		}
	} else {
        try {
            const reviews = await Review.findAll({
                where: {
                    productId: id,	
                },
                attributes: {exclude: ['userEmail']},
                order:[['id','DESC']]
            });
            return response(res,200,reviews);
        } catch (error) {
            next(error);
        }
	}	
};