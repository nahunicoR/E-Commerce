const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const createProduct = require('./createProduct');

router.use('/product', createProduct);

router.get('/', async (req,res,next) => {
res.json('grupo 9')
});

// router.get('/:id', async(req,res,next) => {
    

// });

// router.post('/', async (req, res) => {

// });

// router.put('/', async (req, res) => {

// });

// router.delete('/', async (req, res) => {
// });

module.exports = router;
