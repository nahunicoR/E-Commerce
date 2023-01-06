const { Router } = require('express');
// const  objReview  = require('../controllers/objReview');
// const {getAllReviewDB} = require('../controllers/getAllReviewDB');
const {Review} = require('../db');


const router = Router();

router.get("/:id", async (req, res) => {

	const { id } = req.params;
	
	try {

		const reviews = await Review.findAll({
			where: {
				productId: id,	
			},
			attributes: {exclude: ['userEmail']},
			order:[['id','DESC']]
		});

		return res.status(200).json(reviews);

	} catch (error) {
		next(error);
		res.json(error);
	}
	
})

/*Se comenta ruta con la precarga de bulkcreate para pruebas*/
// router.get('/', async (req, res, next) => {

//     const {productId} = req.body;
//     try {
//         const data = await getAllReviewDB(productId);
        
//         if (!data.length) {
//             const load = await Review.bulkCreate(objReview);
//             return res.json(load);
//         }
//         return res.status(200).json(data);
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;