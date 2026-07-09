const fs = require('fs');

let dataStr = fs.readFileSync('js/data.js', 'utf8');

// The images for materials are Picture1.jpg to Picture17.jpg.
// We need to map them to slides 2-10 and 12-20. Slide 1 and 11 should have no image.
// Some images are .png: Picture4, Picture7
const getPictureName = (index) => {
    if (index === 4 || index === 7) return `Picture${index}.png`;
    return `Picture${index}.jpg`;
};

let materialImages = [];
for (let i = 1; i <= 17; i++) {
    materialImages.push(`images/${getPictureName(i)}`);
}

let slideId = 1;
let imgIndex = 0;

// Replace images in slides
dataStr = dataStr.replace(/image:\s*\"[^\"]*\"/g, (match) => {
    // If it's slide 1 or 11 (which we infer by sequential replacement since there are exactly 20 slides)
    // Wait, the regex will also match quiz images if they exist! 
    // Let's be careful. The slides array has exactly 20 objects. 
    return match; // We will do it more safely
});

// Since data.js assigns images sequentially Picture1 to Picture20, we can just replace them by their current values:
// Current mapping in data.js:
// Slide 1: Picture1.jpg
// Slide 2: Picture2.jpg
// ...
// Slide 20: Picture20.jpg
// We want:
// Slide 1: no image
// Slide 2: Picture1.jpg
// Slide 3: Picture2.jpg
// Slide 4: Picture3.jpg
// Slide 5: Picture4.png
// Slide 6: Picture5.jpg
// Slide 7: Picture6.jpg
// Slide 8: Picture7.png
// Slide 9: Picture8.jpg
// Slide 10: Picture9.jpg
// Slide 11: no image
// Slide 12: Picture10.jpg
// Slide 13: Picture11.jpg
// Slide 14: Picture12.jpg
// Slide 15: Picture13.jpg
// Slide 16: Picture14.jpg
// Slide 17: Picture15.jpg
// Slide 18: Picture16.jpg
// Slide 19: Picture17.jpg
// Slide 20: no image (since we only have 17 pictures)

const slideImageMapping = {
    1: "",
    2: "images/Picture1.jpg",
    3: "images/Picture2.jpg",
    4: "images/Picture3.jpg",
    5: "images/Picture4.png",
    6: "images/Picture5.jpg",
    7: "images/Picture6.jpg",
    8: "images/Picture7.png",
    9: "images/Picture8.jpg",
    10: "images/Picture9.jpg",
    11: "",
    12: "images/Picture10.jpg",
    13: "images/Picture11.jpg",
    14: "images/Picture12.jpg",
    15: "images/Picture13.jpg",
    16: "images/Picture14.jpg",
    17: "images/Picture15.jpg",
    18: "images/Picture16.jpg",
    19: "images/Picture17.jpg",
    20: ""
};

// We will parse the file using simple string manipulation or eval.
// Actually, let's use regex that matches id: X, ... image: "..."
for (let id = 1; id <= 20; id++) {
    const targetImg = slideImageMapping[id];
    
    // We look for: id: 1, ... image: "images/PictureX.jpg"
    // Since we know the previous images were exactly Picture1 to Picture20
    const regex = new RegExp(`(id:\\s*${id}\\s*,.*?image:\\s*)\"[^\"]*\"`, 'g');
    
    if (targetImg === "") {
        dataStr = dataStr.replace(regex, `$1""`);
    } else {
        dataStr = dataStr.replace(regex, `$1"${targetImg}"`);
    }
}

// Now replace images in quizPG.
// The user said Picture18, Picture19, Picture20 are for quiz.
// The questions that ask "Gerakan apa yang sedang dilakukan laki-laki tersebut?" are id 4, 7, 9
const quizMapping = {
    4: "images/Picture18.jpg",
    7: "images/Picture19.jpg",
    9: "images/Picture20.jpg"
};

// Replace or add image properties to these quiz items.
for (const [id, img] of Object.entries(quizMapping)) {
    // Look for id: 4, question: "..."
    // In our data.js, they are like:
    // { id: 4, question: "...", options: [...], correctIndex: X }
    const regex = new RegExp(`({\\s*id:\\s*${id}\\s*,\\s*question:\\s*"[^"]*")`);
    // If it already has an image property, this regex won't touch it. We will just add image: "..." after the question
    if (dataStr.match(regex)) {
        dataStr = dataStr.replace(regex, `$1, image: "${img}"`);
    }
}

fs.writeFileSync('js/data.js', dataStr, 'utf8');
console.log("data.js updated successfully.");
