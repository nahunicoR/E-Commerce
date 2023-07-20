const { Router } = require('express');
const controller = require('../controllers');
const router = Router();

router.get("/:id", controller.getAllReviews)

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