const { Product } = require("../db");
const {response} = require("../utils");

module.exports =  async (req, res, next) => {
	const { title, price, category, description, image, material, stock } = req.body;
	try {
		if (!title) return res.status(400).json("No se ingreso titulo");
		if (!price) return res.status(400).json("No se ingreso precio");
		if (!category) return res.status(400).json("No se ingreso categoria");
		if (!description) return res.status(400).json("No se ingreso descripcion");
		if (!material) return res.status(400).json("No se ingreso material");
		if (!stock) return res.status(400).json("No se ingreso stock");
		const newProduct = {
			title,
			price,
			category,
			description,
			image,
			material,
			stock,
		};
		const [product, created] = await Product.findOrCreate({
			where: {
				title,
				price,
				category,
				image,
				description,
				material,
				stock,
			},
			defaults: newProduct,
		});
		if (!created) return response(res,400,{msg:"El producto ya existe"});
		response(res,200,product);
	} catch (error) {
		next(error);
	};
};