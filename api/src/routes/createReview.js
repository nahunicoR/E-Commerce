const { Router } = require('express');
const { Review } = require('../db');
const router = Router();

router.post('/:id/review', async (req, res) => {
    const { id } = req.params;
    const { description, rating, userId} = req.body;
    try {
        if(!description) return res.status(400).json('No se ingreso descripcion');
        if(!rating) return res.status(400).json('No se ingreso calificacion');
      
        let newReview = await Review.create({
            description,
            rating,
            productId: id,
            userId
        });
        res.status(200).json(newReview);
        
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;