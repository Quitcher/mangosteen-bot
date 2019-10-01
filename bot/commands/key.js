const rp = require('request-promise');
const config = require('../../config.json');

exports.run = (message,callback) => {
    let c = "USD"
    if (message.args[1]) {
        c = message.args[1].toUpperCase()
    }
    let options = {
        uri: `http://api.steampowered.com/ISteamEconomy/GetAssetPrices/v0001/`,
        qs: {
            key: `${config.steam}`,
            appid: '440',
            currency: c
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    }
    rp(options).then(function (res) {
        console.log(res)
        let kval = res.result.assets.find(obj => {
            return obj.name === "5021";
        })
        if (message.args[0]) {
            let text = `\`\`\`Input: ${message.args[0]}\nKey Value: ${kval.prices[c]/100}\nOutput: ${(kval.prices[c]/100)*message.args[0]}\`\`\``
            callback(text);
        } else {
            let text = `\`\`\`Key Value: ${kval.prices[c]/100}\`\`\``
            callback(text);
        }
    }).catch(function (err) {
        console.error(err);
        callback("Sorry, Something Went Wrong.")
    });
}
exports.info = () => {
    let name = "key"
    let structure = "key <input> <currency>"
    let desc = "Find Value of Amount of keys inputted"
    let example = "key 3 THB"
    let cat = 1
    return {
        name,
        structure,
        desc,
        example,
        cat
    }
}
