const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet')
const inquirer = require('inquirer');
const minifyImages = require('./compress')

clear();

console.log(
  chalk.magenta(
    figlet.textSync('bulk\n', { horizontalLayout: 'full' })
  ),
  chalk.yellow(
    figlet.textSync('image\n', { horizontalLayout: 'full' })
  ),
  chalk.cyan(
    figlet.textSync('compress\n', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const path = await askForPath()
  console.log(path);
	minifyImages(path.inPath)
};

run();

async function askForPath() {
    const questions = [
    {
        name: 'inPath',
        type: 'input',
        message: 'Enter the path of the directory containing the original images:',
        validate: function( value ) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter the path.';
            }
        }
    }
    ];
    return inquirer.prompt(questions);
}