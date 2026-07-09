const fs = require('fs');

const slideImageMapping = {
    1: '',
    2: 'images/Picture1.jpg',
    3: '',
    4: 'images/Picture2.jpg',
    5: 'images/Picture3.jpg',
    6: 'images/Picture4.png',
    7: 'images/Picture5.jpg',
    8: 'images/Picture6.jpg',
    9: 'images/Picture7.png',
    10: 'images/Picture8.jpg',
    11: '',
    12: 'images/Picture9.jpg',
    13: 'images/Picture10.jpg',
    14: 'images/Picture11.jpg',
    15: 'images/Picture12.jpg',
    16: 'images/Picture13.jpg',
    17: 'images/Picture14.jpg',
    18: 'images/Picture15.jpg',
    19: 'images/Picture16.jpg',
    20: 'images/Picture17.jpg'
};

let data = fs.readFileSync('js/data.js', 'utf8');

const updatedData = data.replace(/(\{\s*id:\s*(\d+).*?)(image:\s*"[^"]*"\s*,|)(.*?content:\s*\[)/g, (match, prefix, idStr, imgStr, suffix) => {
    const id = parseInt(idStr);
    const newImage = slideImageMapping[id];
    
    if (newImage) {
        return prefix + 'image: "' + newImage + '", ' + suffix;
    } else {
        return prefix + suffix;
    }
});

fs.writeFileSync('js/data.js', updatedData);
console.log('data.js updated successfully.');
