const {response} = require("../utils");

module.exports = async(req,res,next) =>{
    const query = req.query;
    try {
        if(query.id && query.topic == 'merchant_order'){
            const [noti, create] = await Notification.findOrCreate({
                where: {norder: query.id}
            })
        }
        response(res,200,"ok");
    } catch (error) {
        next(error);
    }
};