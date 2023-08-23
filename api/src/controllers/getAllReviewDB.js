const { Review } = require("../db");
const { response } = require("../utils");

module.exports = async (req, res, next) => {
   
    try {
		const {id} = req.params;
		
        const reviewsDb = await Review.findAll({
			where:{
				productId: id
			},
            order:[['id','DESC']]
		});
		
        let reviews = await reviewsDb?.map( rev => {
            return {
                id: rev.id,
                description: rev.description,
                rating: rev.rating,
                productId: rev.productId,
                userId: rev.userId
            }
        })
        return response(res,200,reviews);
    } catch (error) {
        next(error);
    }
}