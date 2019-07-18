const request = require('request');
const { Parser } = require('json2csv');
const fs = require('fs');
const ora = require('ora');

let comments: any = [];
const fields = ['created_time', 'message', 'id'];
const opts = { fields };

const requestComment = async (url: string) => {
  if (url) {
    request(url, (err: any, res: any, body: any) => {
      if (err) {
        throw new Error(err);
      }
      const bodyParsed = JSON.parse(body);
      if (bodyParsed.data) {
        comments = [...comments, ...bodyParsed.data];
        requestComment(bodyParsed.paging.next);
      }
    })
  } else {
    return comments;
  }
}

module.exports = async function getComments(id: string, apiKey: string, params: any, callBack: (err: any, comments: any) => any) {
  const url = `https://graph.facebook.com/v3.2/${id}/comments?access_token=${apiKey}`;
  const commentsOra = ora('Loading post comments').start();
  const res = await requestComment(url);
  commentsOra.succeed();
  comments = res.map((x: any) => {
    return {
      created_time: x.created_time,
      message: x.message,
      id: x.id,
    }
  });
  const exportOra = ora('Exporting data...').start();
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(comments);
    fs.writeFileSync(`./${id}.csv`, csv);
    exportOra.succeed();
  } catch (err) {
    exportOra.fail();
    throw new Error(err);
  }
  
  return;
}