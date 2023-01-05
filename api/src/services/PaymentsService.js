const axios = require('axios');

class PaymentService {
    async createPayment() {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            // payer_email: 'test_user_63135086@testuser.com' ,
            items: [
                {
                    "title": "Nahuel CleanCars",
                    "description": "Nahuel CleanCars",
                    "picture_url": "http://www.myapp.com/myimage.jpg",
                    "category_id": "car_electronics",
                    "quantity": 1,
                    // "currency_id": "U$",
                    "unit_price": 5
                }
              ],
            // "payer": {
            //     "phone": {},
            //     "identification": {},
            //     "address": {}
            // },
            // "payment_methods": {
            //     "excluded_payment_methods": [
            //         {}
            //     ],
            //     "excluded_payment_types": [
            //         {}
            //     ]
            // },
            // "shipments": {
            //     "free_methods": [
            //       {}
            //     ],
            //     "receiver_address": {}
            // },
            // "back_urls": {},
            // "differential_pricing": {},
            // "tracks": [
            //     {
            //       "type": "google_ad"
            //     }
            // ],
            // "metadata": {}
        }

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ process.env.ACCESS_TOKEN }`
            }
        })
        return payment.data;
    }
}

module.exports = PaymentService;