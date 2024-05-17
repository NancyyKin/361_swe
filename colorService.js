const express = require('express')

function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min)
        h = s = 0; // If it's a gray color
    else {
        let diff = max - min;
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        switch (max) {
            case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }
        h /= 6;
    }

    h = Math.round(360 * h);

    return h;
}

function getSeason(hex) {
    let hue = hexToHSL(hex);

    if (hue <= 60 || (330 < hue && hue <= 360)) {
        return "Winter";
    } else if (60 < hue && hue <= 150) {
        return "Spring";
    } else if (150 < hue && hue <= 240) {
        return "Summer";
    } else if (240 < hue && hue <= 330) {
        return "Fall";
    }
}

const app = express();

app.get('/season', (req, res) => {
    const color = req.query.color;
    const colorSeason = getSeason(color);

    console.log("Classified this color: ", color, " to this color season: ")

    res.send({ season: colorSeason });
})

app.listen(3001, () => console.log('Color Service listening on port 3001'));