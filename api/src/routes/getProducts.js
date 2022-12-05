const { Router } = require('express');
const { getProductsDb } = require('../controllers/getProductsDb');
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await getProductsDb();
        if (data.length === 0) {;
      //       const charge =  products;
      //       const restApi = charge.map( product => {
      //           return {
      //               id: product.id,
      //               title: product.title,
      //               price: product.price,
      //               category: product.type,
      //               description: product.description,
      //               image: product.image
      //           }
      //       })
      //       const load = await Product.bulkCreate(restApi);
      //       return res.json(load);
         return res.status(404).json('No hay productos');
      }
       res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;