const xml2js = require('xml2js');
const parser = new xml2js.Parser({trim:true,normalize:true,normalizeTags:true});
const fs = require('fs');
const util = require('util');

fs.readFile('convert.xml', (err, data) => {
    if (err) throw err;
    parser.parseString(data, function (err, result) {
        if (err) throw err;
        let embed = result.text.body[0].embed[0]
        let richEmbed = {
            color: embed.$.color,
            author: {
                name: embed.author[0]._,
                icon_url: embed.author[0].$.src
            },
            title: embed.title[0]._,
            url: embed.title[0].$.href,
            description: embed.description[0],
            fields: [],
            image: embed.img[0].$.src,
            thumbnail: embed.thumbnail[0].$.src,
            footer: {
                icon_url: embed.footer[0].$.img,
                text: embed.footer[0]._
            }
        };
        if (embed.$.timestamp) {
            if (embed.$.timestamp === 'true') {
                richEmbed.timestamp = new Date();
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
            richEmbed.fields.push(result)
        })
        console.log(richEmbed)
    });
});
