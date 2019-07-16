const request = require('request');

let comments: any = [];

module.exports = function getComments(id: string, apiKey: string, params: any, callBack: (err: any, comments: any) => any): void {
  request(`https://graph.facebook.com/v3.2/${id}/comments?access_token=${apiKey}`, (err: any, res: any, body: any) => {
    const bodyParsed = JSON.parse(body);
    if (bodyParsed.error) {
      callBack(bodyParsed.error.message, null);
    } else {
      comments = [...comments, body.data];
      callBack(null, comments);
    }
  });
}