const { Router } = require("express");
const { Product } = require("../db");
const admin = require("../middlewares/admin.js");
const login = require("../middlewares/login.js");
const router = Router();

router.post("/", async (req, res, next) => {
	console.log(login);
	const { title, price, category, description, image, material, stock } =
		req.body;
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
		if (!created) return res.status(400).json("El producto ya existe");
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Las categorias validas son 'Bombilla','Mate','Kit','Yerba'",
			error: "Error en categoria",
		});
	}
});

module.exports = router;
