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

// module.exports = { getAllReviewDB };