// Discord bot client
const Discord = require('discord.js');
const client = new Discord.Client();

// Command Stuff
const xml2js = require('xml2js');
const parser = new xml2js.Parser({trim:true,normalize:true,normalizeTags:true});

const jimp = require('jimp');

const inflect = require('i')();

// Debugging and Testing
const chalk = require('chalk'),
error = chalk.red,
warning = chalk.keyword('orange');
const program = require('commander');

// File Reading
const fs = require('fs');
const rp = require('request-promise');

// Config
const config = require('../config.json');

function convert(str) {
    parser.parseString(str, function (err, result) {
        if (err) throw err;
        let embed = result.text.body[0].embed[0]
        let richEmbed = {embed:{
            color: embed.$.color,
            author: {
                name: embed.author[0]._,
                icon_url: embed.author[0].$.src
            },
            title: embed.title[0]._,
            url: embed.title[0].$.href,
            description: embed.description[0],
            fields: [],
            image: {
                url: embed.img[0].$.src
            },
            thumbnail: {
                url: embed.thumbnail[0].$.src
            },
            footer: {
                icon_url: embed.footer[0].$.img,
                text: embed.footer[0]._
            }}
        };
        if (embed.$.timestamp) {
            if (embed.$.timestamp === 'true') {
                richEmbed.embed.timestamp = new Date();
            }
        }
        embed.fields[0].field.map((e) => {
            let result = {
                name: e.fn[0],
                value:e.ft[0]
            }
            if (e.$) {
                if (e.$.inline) {
                    if (e.$.inline === 'true') {
                        result.inline = true;
                    }
                }
            }
            richEmbed.embed.fields.push(result)
            return richEmbed;
        })
    })
}

program.
version('0.1.0').
option('-d, --dev', 'Developer Mode').
parse(process.argv);

client.on('ready', () => {
    console.log(chalk.green(`Logged in as ${client.user.tag}`));
    if (program.dev) {
        console.log(chalk.green`Developer Mode Enabled`)
        client.user.setPresence({ game: { name: 'Developer Mode',type: 'STREAMING' }, status: 'dnd' })
    } else {
        console.log(chalk.green`Developer Mode ${chalk.red('Disabled')}`)
        client.user.setPresence({ game: { name: 'This Server.',type: 'WATCHING' }, status: 'online' })
    }
});

client.on('debug', (info) => {
    if (program.dev) {
        console.log(info)
    }
});

client.on('warn', (info) => {
    if (program.dev) {
        console.warn(warning(info))
    }
});

client.on('error', (info) => {
    if (program.dev) {
        console.error(error(info))
    }
})

client.on('disconnect', () => {
    console.log(chalk.bold.red('Bot Disconnected'))
})

client.on('guildMemberAdd', member => {
    if (member.guild.id === "444413209265307649") {
        member.addRole('444557352641757195')
    }
    if (member.guild.id === "590428135883931649") {
        member.addRole('590440536477925389')
    }
})

client.on('guildMemberUpdate', (oldMem,newMem) => {
    if (newMem.nickname.startsWith(/[^A-Za-z 0-9 \.-_`]*/g)) {
        let oldnick = newMem.nickname
        message.member.setNickname(oldMem.nickname,`Tried to change nickname to ${oldnick}`)
        .then(console.log)
        .catch(console.error);
    }
})

client.on('message', async message => {

    if(message.author.bot) return;

    if (message.content.toLowerCase()==='shutup mangosteen'||message.content.toLowerCase()==='shut up mangosteen') {
        message.channel.send('no u')
    }

    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // if (command === "help" || command === "?") {
    //     fs.readFile('convert.xml', (err, data) => {
    //         if (err) throw err;
    //         message.channel.send(convert(data))
    //     })
    // }

    if (command === "d") {
        if (args[1]) {
            message.channel.send(Math.floor((Math.random() * (args[0]-args[1])) + args[1]));
        } else {
            message.channel.send(Math.floor((Math.random() * args[0]) + 1));
        }
    }

    if (command === "unedgy") {
        let str = args.join(" ")
        str = inflect.titleize(inflect.foreign_key(str.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '').replace('1','l').replace('3','e').replace('4','a').replace('5','s').replace('8','b').replace('0','o')))
        message.channel.send(str)
    }

    if (command === 'yeet') {
        jimp.read(message.author.avatarURL)
        .then(image => {
            const hi = image
            .resize(75,75)
            .quality(60)
            .background(0xFFFFFFFF)
            .write('memes/avatarconvert.jpg');
            jimp.loadFont(jimp.FONT_SANS_16_BLACK).then(font => {
                jimp.read('memes/meme.jpeg')
                .then(image => {
                    image
                    .scale(1.7)
                    .blit(hi,90,120)
                    .print(font, 30, 280, args.join(' '))
                    .write('memes/memeconverted.jpeg');
                    let img = new Discord.Attachment('memes/memeconverted.jpeg')
                    message.channel.stopTyping(true);
                    message.channel.send(img)
                })
                .catch(err => {
                    console.error(error(err))
                    message.channel.stopTyping(true);
                });
            });
        })
        .catch(err => {
            console.error(error(err))
            message.channel.stopTyping(true);
        });
    }

    if (command === 'f') {
        jimp.read(message.author.avatarURL)
        .then(image => {
            const hi = image
            .resize(175,225)
            .quality(60)
            .background(0xFFFFFFFF)
            .write('memes/avatarconvert.jpg');
            jimp.read('memes/meme1.jpg')
            .then(image => {
                image
                .scale(1.7)
                .blit(hi,1550,120)
                .write('memes/memeconverted.jpeg');
                let img = new Discord.Attachment('memes/memeconverted.jpeg')
                message.channel.stopTyping(true);
                message.channel.send(img)
                .catch(err => {
                    console.error(error(err))
                    message.channel.stopTyping(true);
                });
            });
        })
        .catch(err => {
            console.error(error(err))
            message.channel.stopTyping(true);
        });
    }

    else if (command === 'w' || command === 'write' || command === 'xml') {
        if (message.attachments) {
            let url = message.attachments.first().url
            rp(url)
            .then(function(data){
                parser.parseString(data, function (err, result) {
                    if (err) {
                        console.error(error(err))
                        message.channel.stopTyping(true);
                        message.reply('Incounted an error')
                    };
                    let embed = result.text.body[0].embed[0]
                    let richEmbed = {embed:{
                        color: embed.$.color,
                        author: {
                            name: embed.author[0]._,
                            icon_url: embed.author[0].$.src
                        },
                        title: embed.title[0]._,
                        url: embed.title[0].$.href,
                        description: embed.description[0],
                        fields: [],
                        image: {
                            url: embed.img[0].$.src
                        },
                        thumbnail: {
                            url: embed.thumbnail[0].$.src
                        },
                        footer: {
                            icon_url: embed.footer[0].$.img,
                            text: embed.footer[0]._
                        }}
                    };
                    if (embed.$.timestamp) {
                        if (embed.$.timestamp === 'true') {
                            richEmbed.embed.timestamp = new Date();
                        }
                    }
                    embed.fields[0].field.map((e) => {
                        let result = {
                            name: e.fn[0],
                            value:e.ft[0]
                        }
                        if (e.$) {
                            if (e.$.inline) {
                                if (e.$.inline === 'true') {
                                    result.inline = true;
                                }
                            }
                        }
                        richEmbed.embed.fields.push(result)
                    })
                    message.channel.stopTyping(true);
                    message.channel.send(richEmbed)
                });
            })
            .catch(function(err){
                message.channel.stopTyping(true);
                message.reply('Incounted an error')
                console.error(error(err))
            });
        } else {
            message.channel.stopTyping(true);
            message.reply('Please Include the XML File to read')
        }
    }
});



client.login(config.token);
