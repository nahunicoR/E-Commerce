const { Router } = require('express');
const { Review } = require('../db');

const router = Router();

router.put("/:idReview", (req, res) => {

	const { idReview } = req.params;

	const { description, rating, userEmail } = req.body;
      try {
            const reviewUpdate = Review.update(
                  { 
                  description: description,
                  rating: rating,
                  },
                  { 
                  where: { 
                        id: idReview,
                        userEmail
                  }
                  }
	      )
            reviewUpdate ? res.json({message:`Se actualizo correctamente review con id: ${idReview}`}) : res.json({message:`No se pudo actulizar`});
      } catch (error) {
            next(error)
            res.json(error)
      }
	
})

module.exports = router;