const jimp = require('jimp');

const imageconfig = {
    avatarResize: 75,
    template: 'meme.jpeg',
    templateScale: 1.7,
    avatarPlacement: {x:90,y:120},
    text: {
        exists:true,
        size:jimp.FONT_SANS_16_BLACK,
        placement: {x:30, y:155}
    }
}

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
            .print(font, 30, 155, 'Neat Stuff')
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
