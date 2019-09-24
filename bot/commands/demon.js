const rp = require('request-promise');
const config = require('../../config.json');

exports.run = (message,callback) => {
    if (message.args[0]) {
        if (Number(message.args[0]) != NaN) {
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
                        let text = `\`\`\`\nName: ${res.data.name}\nPlace: ${res.data.position}\nPublisher: ${res.data.publisher.name}\nVerifier: ${res.data.verifier.name}\`\`\`\n${res.data.video}`
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
            callback("Please Put In a Vaild Number");
        }
    } else {
        callback("Please Put a Number In Front of the command like `demon 4`");
    }
}
