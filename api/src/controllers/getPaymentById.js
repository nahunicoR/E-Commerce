const mercadopago = require("mercadopago");
const { ACCESS_TOKEN } = process.env;

module.exports = async (req, res, next) => {

    const mp = new mercadopago(ACCESS_TOKEN);
    const id = req.params.id;
    try {
        mp.get(`/v1/payments/search`, { id: id })
          .then((result) => {
            res.status(200).send({ result: result });
          })
          .catch((err) => {
            res.status(400).send({ error: err });
        });
    } catch (error) {
        next(error);
    };
};
