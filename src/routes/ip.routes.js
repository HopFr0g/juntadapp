module.exports = app => {
    const ip = require("../controllers/ip.controller.js");
    
    var router = require("express").Router();
    
    router.get("/ip", ip.findAll);
    
    app.use("/api/ip", router);
};