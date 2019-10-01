exports.run = (message,callback) => {
    callback(`https://minecraft.tools/download-skin/${message.args[0]}`);
}
exports.info = () => {
    let name = "skin"
    let structure = "skin <username>"
    let desc = "Gets MC Skin"
    let example = "skin notch"
    let cat = 2
    return {
        name,
        structure,
        desc,
        example,
        cat
    }
}
