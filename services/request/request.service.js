const request = require('request');
const Promise = require('bluebird');
function callRequest(options) {
    if (!options) {
        throw new Error('There is no options parameter for request');
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject({
                    status: -1,
                    error
                });
            } else {
                resolve({
                    status: 0,
                    error: false,
                    data: body
                });
            }
        });
    });
}
module.exports = { callRequest };
