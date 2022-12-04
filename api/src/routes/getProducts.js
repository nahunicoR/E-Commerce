const { Router } = require('express');
const { getProductsDb } = require('../controllers/getProductsDb');

const router = Router();

router.get('/', async (req, res) => {
    try {
        let data = await getProductsDb();
        console.log(data)
        if (data.length === 0) {
            return res.json('La DB esta vacia');
        }
        return res.json(data);
    } catch (error) {
        console.log(error)
        return res.send('Comuniquense con el equipo del backend');
    }
})

module.exports = router;