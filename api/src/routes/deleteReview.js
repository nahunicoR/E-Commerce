const { Router } = require('express');
const { Review } = require('../db');

const router = Router();

router.delete("/:idReview", async (req, res) => {
	const { idReview } = req.params;

	try {
		const reviewDeleted = await Review.destroy({
			where: {
				// productId: id,
				id: idReview
			}
		});

		reviewDeleted ? res.json({message:`Se elimino comentario ${idReview}`}) : res.json({ message: 'El comentario que quieres borrar no se ha encontrado, verifica que exista' });

	} catch (error) {
		next(error);
		res.json(error);
	}

})

module.exports = router;