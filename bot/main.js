const Slack = require('slackbots');
const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const responseObject = require('./misc/autoresponse.json')

// Clients
const slackb = new Slack({
    token: config.slacktoken,
    name: 'Mangosteen'
})
const discordb = new Discord.Client();

// Debugging and Testing
const chalk = require('chalk'),
error = chalk.red,
warning = chalk.keyword('orange');
const program = require('commander');

program.
version('0.1.0').
option('-d, --dev', 'Developer Mode').
parse(process.argv);

if (program.dev) {
    console.log(chalk.green`Developer Mode Enabled`)
} else {
    console.log(chalk.green`Developer Mode ${chalk.red('Disabled')}`)
}

//
slackb.on('start', () => {
    console.log(chalk.green(`Logged in as ${(slackb.name)}`));
});

discordb.on('ready', () => {
    console.log(chalk.green(`Logged in as ${discordb.user.tag}`));
    if (program.dev) {
        discordb.user.setPresence({ game: { name: 'Developer Mode',type: 'WATCHING' }, status: 'dnd' })
    } else {
        discordb.user.setPresence({ game: { name: 'This Server.',type: 'WATCHING' }, status: 'online' })
    }
});
//

slackb.on('message', message => {

    if (message.type != "message") return;

    if (message.subtype == "bot_message") return;

    if(responseObject[message.text.toLowerCase()]) {
        slackb.postMessage(message.channel,responseObject[message.text.toLowerCase()]);
    }

    if(message.text.indexOf(config.prefix) !== 0) return;

    const arguments = message.text.slice(config.prefix.length).trim().split(/ +/g);
    const command = arguments.shift().toLowerCase();

    let uname = ''
    let uavatar = ''
    let gid = ''

    const users = slackb.getUsers()._value.members

    if (program.dev) {
        console.log(message)
    }

    users.forEach((u) => {
        if (u.ok) {
            if (u.id == message.user) {
                uname = u.user.profile.display_name
                uavatar = u.user.profile.image_original
                gid = u.user.profile.team
            }
        }
    })

    const hybridmessage = {
        args: arguments,
        author: {
            name: uname,
            id: message.user,
            avatar: uavatar,
            mention: `<@${message.user}>`
        },
        guild: {
            id: gid
        },
        platform: "slack"
    }

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(error(err));
        files.forEach(file => {
            if (!file.endsWith(".js")) return;

            let commandName = file.split(".")[0];
            if (commandName == command) {
                let func = require(`./commands/${file}`);
                func.run(hybridmessage,(text) => {slackb.postMessage(message.channel,text)})
            } else {
                return;
            }
        })
    })
})

discordb.on('message', message => {

    if(message.author.bot) return;

    if(responseObject[message.content]) {
        message.channel.send(responseObject[message.content]);
    }

    if(message.content.indexOf(config.prefix) !== 0) return;

    const arguments = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = arguments.shift().toLowerCase();

    const hybridmessage = {
        args: arguments,
        author: {
            name: message.author.name,
            id: message.author.id,
            avatar: message.author.avatarURL
        },
        guild: {
            id: message.guild.id
        },
        platform: "discord"
    }

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(error(err));
        files.forEach(file => {
            if (!file.endsWith(".js")) return;

            let commandName = file.split(".")[0];
            if (commandName == command) {
                let func = require(`./commands/${file}`);
                func.run(hybridmessage,(text) => {message.channel.send(text)})
            } else {
                return;
            }
        })
    })
});

discordb.login(config.token);
