const express = require('express');
const router = express.Router();
const { Product, Category, User, Order, Orderline, Review } = require('../db.js');
const mercadopago = require('mercadopago');
const {MERCADO_PAGO_KEY_TEST} = process.env;

mercadopago.configure({
    access_token: MERCADO_PAGO_KEY_TEST
});

router.post('/checkout', async (req, res) => {
    const { cart, user } = req.body;
    const { id, email } = user;
    const { products, total } = cart;
    const order = await Order.create({
        userId: id,
        status: 'created',
        paymentMethod: 'mercadopago',
        total
    });
    const orderlines = await Promise.all(products.map(async (product) => {
        const { id, name, price, quantity } = product;
        const orderline = await Orderline.create({
            orderId: order.id,
            productId: id,
            name,
            price,
            quantity
        });
        return orderline;
    }));
    const preference = {
        items: products.map((product) => {
            return {
                title: product.name,
                unit_price: product.price,
                quantity: product.quantity
            };
        }),
        payer: {
            email
        },
        back_urls: {
            success: 'http://localhost:3000/checkout-success',
            failure: 'http://localhost:3000/mercadopago/failure',
            pending: 'http://localhost:3000/mercadopago/pending'
        },
        auto_return: 'approved',
        external_reference: order.id
    };
    mercadopago.preferences.create(preference)
        .then((response) => {
            res.json({ id: response
                .body
                .id });
        })
        .catch((error) => {
            console.log(error);
        });
});