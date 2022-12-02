const { Router } = require('express');
const {Product} = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/products', async (req,res) => {

    try {

        let infoDB = await Product.findAll();
        infoDB.length === 0 ? res.json('BASE DE DATOS ESTA VACIA') : res.json(infoDB);

    } catch (error) {
        return res.send(error.parent.detail);
    }

});

router.get('/:id', async(req,res) => {
    

});

router.post('/createProduct', async (req, res) => {
  
});

router.put('/', async (req, res) => {

});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

     try {
        
        if(id){
            const deleteProduct = await Product.findByPk(id);
           if(deleteProduct){
                await deleteProduct.destroy();
                res.send('Product was deleted successfully')
           }else{
                res.status(404).send("ERROR: No matches for that ID.");
           }
                
        }else{
            res.status(400).send('ERROR: ID does not exist.');
        }


     } catch (error) {
         return res.send(error.parent.detail);
     }

});


module.exports = router;
