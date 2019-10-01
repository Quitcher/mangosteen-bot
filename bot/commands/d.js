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
exports.info = () => {
    let name = "d"
    let structure = "d <max>|d <min> <max>"
    let desc = "Output a Random Number"
    let example = "d 5|d 2 9"
    let cat = "Math"
    return {
        name,
        structure,
        desc,
        example,
        cat
    }
}
