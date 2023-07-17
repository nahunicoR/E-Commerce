const {response} = require("../utils");
const { Review } = require('../db');

module.exports = async (req, res) => {
	const { idReview } = req.params;
	try {
		const reviewDeleted = await Review.destroy({
			where: {
				// productId: id,
				id: idReview
			}
		});
		reviewDeleted ? response(res,200,{message:`Se elimino comentario ${idReview}`}) : response(res,403,{ message: 'El comentario que quieres borrar no se ha encontrado, verifica que exista' });
	} catch (error) {
		next(error);
		response(res,500,error);
	}
};