const mercadopago = require('mercadopago');
const {ACCESS_TOKEN} = process.env;

module.exports = async (req,res,next) => {
    mercadopago.configure({
        access_token: ACCESS_TOKEN,
    });
    const {body} = req;
    try {
        const items_ml = body.cart.map((product) =>({
            id: product.id,
            title: product.title,
            unit_price: product.price,
            quantity: product.quantity,
            currency_id: "ARS",
        }));    

        const preference = {
            items: items_ml,
            back_urls: {
                success: `${BACK_URL}/payment/result`,
                failure: `${BACK_URL}/payment/result`,
                pending: `${BACK_URL}/payment/result`
            },
            payer:{
                email: body.user.email,
                name: body.user.email,
            },
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "atm"
                    }
                ],
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                //cantidad de cuotas para pruebas es 1.
                installments: 3
            },
            binary_mode: true,
            // notification_url: `${BACK_URL}/payment/notification`,
            statement_descriptor: "To-Mate",
        }
        await mercadopago.preferences.create(preference)
        .then((resp)=> {
            return res
            .status(200)
            .json(resp.body.init_point)
        }).catch((err)=> {
             console.log(err)
            res.send({error: err.message})
            next(err)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};