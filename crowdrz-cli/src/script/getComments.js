import inquirer from 'inquirer';

const Crowdrz = require('../../../crowdrz-js/dist/Crowdrz');

const ora = require('ora');

async function promptMissingOptions() {
  const questions = [];

  questions.push({
    type: 'input',
    name: 'postId',
    message: 'Post ID'
  });

  questions.push({
    type: 'list',
    name: 'output',
    message: 'Output name',
    choices: ['.csv', '.txt', '.json'],
    default: ['.csv']
  });

  questions.push({
    type: 'confirm',
    name: 'metadata',
    message: 'Load metadata ?',
  });

  const answers = await inquirer.prompt(questions);
  return answers;
}

module.exports = async function() {
  await promptMissingOptions();
  let crowdrz = new Crowdrz('facebook', 'EAAOdARHxc0YBABolBl0d5uw7zIpLsJFUChIV5gTuxxjzpE4wMZARNORfCWdx3ujB4l0NffFKKE1hZAQKuBIEsmiph1Lv9M1NcreG4o89FXpcuZA5WiPaTwBUFE9R1n1aiYjeHqPILyMdouUwlhSMcBaamcdaTB45XeoUZCeB0ZBVLKy1FTv1J4KQ2lYbe2a4ZD');
  let comments = crowdrz.applyProcess('getComments', '2394127887331679');
  console.log('comments', comments);
}


 

 
