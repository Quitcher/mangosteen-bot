const SlackBot = require('slackbots');
const config = require('../config.json');

// Debugging and Testing
const chalk = require('chalk'),
error = chalk.red,
warning = chalk.keyword('orange');
const program = require('commander');

// Command Libraries

program.
version('0.1.0').
option('-d, --dev', 'Developer Mode').
parse(process.argv);

const client = new SlackBot({
    token: config.slacktoken,
    name: 'Mangosteen'
})

client.on('start', () => {
    console.log(chalk.green(`Logged in as ${(client.name)}`));
    if (program.dev) {
        console.log(chalk.green`Developer Mode Enabled`)
    } else {
        console.log(chalk.green`Developer Mode ${chalk.red('Disabled')}`)
    }
});

client.on("start", () => {
    client.postMessageToChannel('general', 'Bong\'Lau');
})

client.on('message', data => {

});
