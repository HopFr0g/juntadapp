"use strict";

const getOkResponse = (message, elements) => {
    let res = new Object();
    
    res.ok = true;
    res.status = 201;
    res.message = message;
    
    if (Array.isArray(elements)) {
        res.elements = elements;
        res.size = elements.length;
    } else {
        res.elements = new Array();
        res.elements.push(elements);
        res.size = 1;
    }
    
    return res;
}

const getBadResponse = (message, error, status) => {
    let res = new Object();
    
    res.ok = false;
    res.status = status;
    res.message = message;
    res.error = error;
    res.elements = new Array();
    res.size = 0;
    
    return res;
}

module.exports = {
    getOkResponse,
    getBadResponse
}