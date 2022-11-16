let crypto = require('crypto')
async function gen (length) {
    return await crypto.randomBytes(length).toString('hex');
}
module.exports=gen
