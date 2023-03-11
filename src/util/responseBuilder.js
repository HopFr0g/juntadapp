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

const getBadResponse = (error) => {
    let res = new Object();
    
    res.ok = false;
    res.status = error.status;
    res.message = error.name + ": " + error.message;
    res.elements = new Array();
    res.size = 0;
    
    return res;
}

module.exports = {
    getOkResponse,
    getBadResponse
}