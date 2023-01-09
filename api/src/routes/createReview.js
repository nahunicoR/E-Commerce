const { Router } = require('express');
const { Review } = require('../db');
const router = Router();

router.post('/', async (req, res, next) => {

    const { userEmail, description, rating, productId } = req.body;
    
    try {
            const [review, created] = await Review.findOrCreate({
            where:{
                description,
                rating,
                productId,
                userEmail
            }
        })
        !created ? res.status(400).json('La review ya existe') : res.status(200).json(review);
    } catch (error) {
        next(error);
        res.status(400).json(error.message)
    }
   
});

module.exports = router;
