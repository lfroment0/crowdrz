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
  ora('Find post data').start().succeed();
  const commentsOra = ora('Loading post comments').start();
  setTimeout(() => {
    commentsOra.succeed();
  }, 2000);
  const exportOra = ora('Exporting data...').start();
  setTimeout(() => {
    exportOra.succeed();
  }, 3000);

  let crowdrz = new Crowdrz('facebook', 'EAAOdARHxc0YBAB1tBLkE55o01tf3oBRQnukOW84ahzmZAPPH8nhs6rEqXU6IUO0qzDQ9OnKDnJCYkS4Mm0QdNQXlqOm5U9UiVX1hK5yhK4GFZAQ1JE1XT0zA2JVOzMpJxJUxeJEKuy8SU0gNM5wWTyiYETxwONQ4luyw0SCpM9OLsSXZApgZA1MF5FHwaHUZD');
  let comments = crowdrz.applyProcess('getComments', '2394127887331679');
  console.log('comments', comments);
}


 

 
