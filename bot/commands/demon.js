const rp = require('request-promise');
const config = require('../../config.json');

function isnumber(msg) {
    return msg.includes("1")||msg.includes("2")||msg.includes("3")||msg.includes("4")||msg.includes("5")||msg.includes("6")||msg.includes("7")||msg.includes("8")||msg.includes("9")||msg.includes("0");
}

exports.run = (message,callback) => {
    if (message.args[0]) {
        if (Number(message.args[0]) != NaN && isnumber(message.args[0])) {
            if (Number(message.args[0] <= 150)) {
                if (Number(message.args[0]) >= 1) {
                    let options = {
                        uri: `https://pointercrate.com/api/v1/demons/${message.args[0]}/`,
                        qs: {
                            Authorization: `Bearer ${config.jwt}`
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: true
                    }

                    rp(options).then(function (res) {
                        let video = res.data.video
                        if (res.data.video == null) {
                            video = res.data.records[0].video
                        }
                        let text = `\`\`\`\nName: ${res.data.name}\nPlace: ${res.data.position}\nPublisher: ${res.data.publisher.name}\nVerifier: ${res.data.verifier.name}\`\`\`\n${video}`
                        callback(text);
                    }).catch(function (err) {
                        console.error(err);
                        callback("Sorry, Something Went Wrong.")
                    });
                } else {
                    callback("Please Put In a Number Bigger than 0");
                }
            } else {
                callback("Please Put In a Number Less than 151");
            }
        } else {
            let options = {
                uri: `https://pointercrate.com/api/v1/demons/`,
                qs: {
                    Authorization: `Bearer ${config.jwt}`,
                    name: message.args.join(" ")
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
            }
            rp(options).then(function (resp) {
                if (resp === []) {
                    callback("Couldn't find anything")
                } else {
                    console.log(resp)
                    let opt = {
                        uri: `https://pointercrate.com/api/v1/demons/${resp[0].position}/`,
                        qs: {
                            Authorization: `Bearer ${config.jwt}`
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: true
                    }
                    rp(opt).then(function (res) {
                        let video = res.data.video
                        if (res.data.video == null) {
                            video = res.data.records[0].video
                        }
                        let text = `\`\`\`\nName: ${res.data.name}\nPlace: ${res.data.position}\nPublisher: ${res.data.publisher.name}\nVerifier: ${res.data.verifier.name}\`\`\`\n${video}`
                        callback(text);
                    }).catch(function (err) {
                        console.error(err);
                        callback("Sorry, Something Went Wrong.")
                    });
                }
            }).catch(function (err) {
                console.error(err);
                callback("Sorry, Something Went Wrong.")
            });
        }
    } else {
        callback(`Please Put a Number or Name In Front of the command e.g.\`${config.prefix}demon 4\``);
    }
}
exports.info = () => {
    let desc = ""
    let example = ""
    let cat = 0
}
