exports.run = (message,callback) => {
    const args = message.args
    if (args[1]) {
        let num = Math.floor(Math.random() * (args[1] - args[0]) + args[0])
        callback(num.toString());
    } else if (args[0]) {
        let num = Math.floor(Math.random() * (args[0]) + 1)
        callback(num.toString());
    } else {
        callback('Please Put in a Valid Number');
    }
}
