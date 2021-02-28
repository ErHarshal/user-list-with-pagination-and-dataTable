const config = require('../config/config')
const bcrypt = require('bcryptjs');

/**
 * Function that create hash for plaintext
 * @param {Any} data
 */
const bcryptEncryption = (data) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, config.brcyptSaltRounds).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    bcryptEncryption
}