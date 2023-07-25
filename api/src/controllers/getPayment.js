const { Product, Order, Orderdetail, User, Address, Notification } = require('../db.js');
const Sequelize = require('sequelize');
const mercadopago = require('mercadopago');
const {ACCESS_TOKEN, FRONT_URL} = process.env;
const axios = require('axios');

module.exports = async (req, res) => {
    mercadopago.configure({
        access_token: ACCESS_TOKEN,
    });
    const payment_id = req.query.payment_id;
    let status = req.query.status; 

     if(status === "approved"){
        const mercadopagoreq =  await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}?access_token=${ACCESS_TOKEN}`);
        const payerTomate = mercadopagoreq.data.additional_info.payer.first_name;
        const itemsPagados =  mercadopagoreq.data.additional_info.items;
        const {operation_type, transaction_amount,order} = mercadopagoreq.data;

        let status = mercadopagoreq.data.status;
        if(status === 'approved') status = 'creada';

        let statusDetail = mercadopagoreq.data.status_detail;
        if(statusDetail === 'accredited') statusDetail = 'completa';

        const orderCreated = await Order.create({
            status: statusDetail,
            purchaseCost: transaction_amount,
            payOrder: order.id,
            paymentMethod: operation_type,
            userEmail: payerTomate,
            email: payerTomate,
        });
        await orderCreated.addUser(payerTomate);

        itemsPagados.forEach( async(item) => {
            let idNumber = Number(item.id);
            const orderDetailCreated = await Orderdetail.create({
                purchasedamount: itemsPagados.length,
                purchaseprice: transaction_amount,
                orderId: orderCreated.id,
                productId:idNumber,
            });
            await orderDetailCreated.addOrder(orderCreated.id);
        });
        await itemsPagados.forEach(async (item) => {
                await Product.update(
                {
                    stock: Sequelize.literal(`stock - ${item.quantity}`),
                },
                {where: {
                    id: item.id
                }
            });
        });
        return res.redirect(`${FRONT_URL}/checkout-success`);
    };
    return res.redirect(`${FRONT_URL}/checkout-failure`);
};
