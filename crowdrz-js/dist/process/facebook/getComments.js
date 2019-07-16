"use strict";
const request = require('request');
let comments = [];
module.exports = function getComments(id, apiKey, params, callBack) {
    request(`https://graph.facebook.com/v3.2/${id}/comments?access_token=${apiKey}`, (err, res, body) => {
        const bodyParsed = JSON.parse(body);
        if (bodyParsed.error) {
            callBack(bodyParsed.error.message, null);
        }
        else {
            comments = [...comments, body.data];
            callBack(null, comments);
        }
    });
};
