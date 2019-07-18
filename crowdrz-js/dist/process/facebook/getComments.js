"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('request');
const { Parser } = require('json2csv');
const fs = require('fs');
const ora = require('ora');
let comments = [];
const fields = ['created_time', 'message', 'id'];
const opts = { fields };
const requestComment = (url) => __awaiter(this, void 0, void 0, function* () {
    if (url) {
        request(url, (err, res, body) => {
            if (err) {
                throw new Error(err);
            }
            const bodyParsed = JSON.parse(body);
            if (bodyParsed.data) {
                comments = [...comments, ...bodyParsed.data];
                requestComment(bodyParsed.paging.next);
            }
        });
    }
    else {
        return comments;
    }
});
module.exports = function getComments(id, apiKey, params, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://graph.facebook.com/v3.2/${id}/comments?access_token=${apiKey}`;
        const commentsOra = ora('Loading post comments').start();
        const res = yield requestComment(url);
        commentsOra.succeed();
        comments = res.map((x) => {
            return {
                created_time: x.created_time,
                message: x.message,
                id: x.id,
            };
        });
        const exportOra = ora('Exporting data...').start();
        try {
            const parser = new Parser(opts);
            const csv = parser.parse(comments);
            fs.writeFileSync(`./${id}.csv`, csv);
            exportOra.succeed();
        }
        catch (err) {
            exportOra.fail();
            throw new Error(err);
        }
        return;
    });
};
