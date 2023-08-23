module.exports = (res,statusCode,data)=> {
    res.status(statusCode).json(data);
};