const crypto = require("crypto");

const getHash = async (length, checkCallback) => {
    let hash;
    let checked = false;
    
    while (!checked) {
        hash = crypto.randomBytes(length / 2).toString('hex');
        checked = await checkCallback(hash);
    }
    
    return hash;
};

module.exports = {
    getHash
};