"use strict";
const request = require('request');
module.exports = function (id, apiKey) {
    request(`https://graph.facebook.com/v3.2/${id}/comments?access_token=${apiKey}`, (err, res, body) => {
        console.log('body', body);
    });
};
