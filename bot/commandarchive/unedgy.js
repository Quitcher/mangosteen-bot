const inflect = require('i')();

exports.run = (message,callback) => {
    let input = message.args.join(' ')
    input = inflect.titleize(inflect.foreign_key(input.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '').replace('1','l').replace('3','e').replace('4','a').replace('5','s').replace('0','o')))
    callback(input);
}
