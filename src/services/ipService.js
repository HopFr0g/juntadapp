const Ip = require("../models/ipModel.js");

const findAll = async () => {
    let res = await Ip.findAll();
    return res;
};

module.exports = {
    findAll
};