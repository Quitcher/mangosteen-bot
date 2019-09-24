const jimp = require('jimp');

jimp.read('avatar.png')
.then(image => {
    const hi = image
    .resize(75,75)
    .quality(60)
    .background(0xFFFFFFFF)
    .write('avatarconvert.jpg');
    jimp.loadFont(jimp.FONT_SANS_16_BLACK).then(font => {
        jimp.read('meme.jpeg')
        .then(image => {
            return image
            .print(font, 30, 155, 'Porn Folder')
            .scale(1.7)
            .blit(hi,90,120)
            .write('memeconverted.jpeg');
        })
        .catch(err => {
            console.error(err)
        });
    });
})
.catch(err => {
    console.error(err)
});
