const { Parser } = require('json2csv');
const request = require('request');
const fs = require('fs');

let comments = [];
const fields = ['created_time', 'message', 'id'];
const opts = { fields };


const getComments = (id, url = null) => {
  console.log('url', url);
  if (url) {
    request(url, (err, res, body) => {
      body = JSON.parse(body);
      if (body.data) {
        comments = [...comments, ...body.data];
        getComments(id, body.paging.next);
      }
    });
  } else {
    comments = comments.map(x => {
      return {
        created_time: x.created_time,
        message: x.message,
        id: x.id,
      }
    });
    try {
      const parser = new Parser(opts);
      const csv = parser.parse(comments);
      fs.writeFileSync(`./${id}.csv`, csv)
      console.log(csv);
    } catch (err) {
      console.error(err);
    }
  } 
}

getComments('402838873893694', 'https://graph.facebook.com/v3.2/402838873893694/comments?access_token=EAAOdARHxc0YBACmVHPVUbjJilmZBqp2niFheU9QbA1LMACqG9CtaZB9GC5Wl6L758DdnluO9ztsjzgyxoUrcRzhCRSeES8MURWIjtlREvKUaTRbokyuNk2NZCmx5BeNb5tJhlGYEyezY3ZAE4EdAtPn32IAO9lzSwUJa4d4ABNtJCjWiteIbWahwXrKExZA0ZD');
