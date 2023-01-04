const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    let reviews = [
    {
        "description": "es un buen producto lo recomiendo",
        "rating": 5,
        
    },
    {
        "description": "no es lo que esperaba",
        "rating": 2,
        
    },
    {
        "description": "Estéticamente es hermoso y cumple perfectamente lo que promete",
        "rating": 4,
        
    },
    {
        "description": "Brutal , altamente recomendable",
        "rating": 5,
        
    },
    {
        "description": "es justo la bombilla que buscaba",
        "rating": 3,
        
    },
    {
        "description": "Es tal como dice la publicación, pero no me gusto",
        "rating": 1,
        
    },
    {
        "description": "no me gusta para nada",
        "rating": 1,
        
    },
    {
        "description": "lo compre solo para regalo",
        "rating": 3,
        
    },
    {
        "description": "esta muy bueno es increible",
        "rating": 5,
        
    }
]
    try {
       res.send(reviews)
        
    } catch (error) {
        console.log(error)

    }
});

module.exports = router;