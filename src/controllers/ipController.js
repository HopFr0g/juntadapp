const ipService = require("../services/ipService.js");

const findAll = async (req, res) => {
    let allIps = await ipService.findAll();
    
    res.send(allIps);
}

module.exports = {
    findAll
};