function complementryHexColor(hex) {
    let r = hex.length == 4 ? parseInt(hex[1] + hex[1], 16) : parseInt(hex.slice(1, 3), 16);
    let g = hex.length == 4 ? parseInt(hex[2] + hex[2], 16) : parseInt(hex.slice(3, 5), 16);
    let b = hex.length == 4 ? parseInt(hex[3] + hex[3], 16) : parseInt(hex.slice(5), 16);

    [r, g, b] = complementryRGBColor(r, g, b);
    return '#' + (r < 16 ? '0' + r.toString(16) : r.toString(16)) + (g < 16 ? '0' + g.toString(16) : g.toString(16)) + (b < 16 ? '0' + b.toString(16) : b.toString(16));
}

function complementryRGBColor(r, g, b) {
    if (Math.max(r, g, b) == Math.min(r, g, b)) {
        return [255 - r, 255 - g, 255 - b];

    } else {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h = Math.round((h * 60) + 180) % 360;
        h /= 360;

        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}

function randomhex() {
    let color = "#";
    const clist = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    for (let i = 0; i < 6; i++) {
        x = clist[Math.floor(Math.random() * 16)]

        color += x;
    }
    return color;
}

function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let diff = max - min;
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        switch (max) {
            case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }
        h /= 6;
    }

    return [h * 100, s * 100, l];
}

function bwcontrast(hex) {
    let hsl = hexToHSL(hex);
    let lightness = hsl[2];

    return lightness < 0.5 ? "#ffffff" : "#000000";
}

let history = [];
let currentPosition = -1;
let nextPage = false;
let selectedColor = randomhex();
let currentColor = selectedColor;

const currentColorBox = document.querySelector("#currentColor");

function toggle(selector) {
    var x = selector;
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function matchHexColors() {
    document.getElementById("selectColorDiagram").value = selectedColor;
    document.getElementById("typedHex").value = selectedColor;
}

function gotomainpage() {
    document.querySelector('.mainPage').hidden = false;
    document.querySelector('#newsContent').hidden = true;
    document.querySelector('#colorPicker').hidden = true;
    document.querySelector('#sureColor').hidden = true;
    document.querySelector('#individualColorPage').hidden = true;
    document.querySelector('#compContent').hidden = true;
    document.querySelector('#clearAll').hidden = true;
    document.querySelector('.history').hidden = true;
    matchHexColors();
}

gotomainpage();


// Latest News Popup:
document.querySelector("#news").addEventListener("click", () => {
    toggle(document.querySelector('#newsContent'));
})

// Complementary colors popup
document.querySelector("#compInfo").addEventListener("click", () => {
    toggle(document.querySelector('#compContent'));
})

// setting the Color Diagram Color changes the typedHex value
document.querySelector("#selectColorDiagram").addEventListener("blur", function () {
    selectedColor = document.getElementById("selectColorDiagram").value;
    matchHexColors();
    document.querySelector('#sureColor').hidden = true;
})

// setting the typedHex value changes the  Color Diagram Color 
document.querySelector("#typedHex").addEventListener("blur", function () {
    selectedColor = document.getElementById("typedHex").value;
    matchHexColors();
    document.querySelector('#sureColor').hidden = true;
})

// go to welcome page
document.querySelector('h1').addEventListener("click", () => {
    document.querySelector('#news').hidden = false;
    gotomainpage();

})

// go to color picker page
document.querySelector('#startPicker').addEventListener("click", () => {
    document.querySelector('.mainPage').hidden = true;
    document.querySelector('#colorPicker').hidden = false;
    if (history.length > 0) {
        document.querySelector('.history').hidden = false;
    }
})

// go to color picker page
document.querySelector('#backToPicker').addEventListener("click", () => {
    document.querySelector('#news').hidden = true;
    document.querySelector('#colorPicker').hidden = false;
    document.querySelector('#individualColorPage').hidden = true;
})

// opens Are you sure you want to clear?
document.getElementById('sureClear').addEventListener("click", () => {
    toggle(document.getElementById('clearAll'));
})

// closess Are you sure you want to clear?
document.getElementById('historyOK').addEventListener("click", () => {
    toggle(document.getElementById('clearAll'));
})

// yes -- clears all history
document.getElementById('clearHistory').addEventListener("click", () => {
    const parent = document.getElementById("historyBar")
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    let history = [];
    let currentPosition = -1;
    toggle(document.querySelector('#clearAll'));
    document.querySelector('#colorPicker').hidden = false;
    document.querySelector('#individualColorPage').hidden = true;
    document.querySelector('#sureColor').hidden = true;
})

function showIndColorPage(selectedColor) {
    currentColorBox.style.backgroundColor = selectedColor;
    document.querySelector('#individualColorPage').hidden = false;
    document.querySelector('#colorPicker').hidden = true;
    document.querySelector('#selectedColor').textContent = selectedColor;

    complimentColor = complementryHexColor(selectedColor);
    document.querySelector('#compColor').textContent = complimentColor;
    document.querySelector('#complementaryColor').style.backgroundColor = complimentColor;
}


// history - previous color arrow
document.getElementById('previousColor').addEventListener('click', function () {
    if (currentPosition > 0) {
        currentPosition--;
        currentColor = history[currentPosition];
    }
    showIndColorPage(currentColor);
});

// history - next color arrow
document.getElementById('nextColor').addEventListener('click', function () {
    if (currentPosition < history.length - 1) {
        currentPosition++;
        currentColor = history[currentPosition];
    }
    showIndColorPage(currentColor);
});

document.querySelector("#submitColor").addEventListener("click", function () {
    document.querySelector('#yesColor').style.backgroundColor = selectedColor;
    // currentColorBox.style.backgroundColor = currentColor;
    document.querySelector('#sureColor').hidden = false;

})

function addColorToHistoryBar(color, position) {
    const historyBar = document.getElementById('historyBar');
    const newHistoryColor = document.createElement('div');
    newHistoryColor.className = 'historyColor';
    newHistoryColor.style.backgroundColor = color;

    const para = document.createElement("p");
    const node = document.createTextNode(selectedColor);
    para.appendChild(node);
    para.style.backgroundColor = "rgba( 255, 255, 255, 0.4)";
    // para.style.backgroundColor = selectedColor;
    // para.style.color = bwcontrast(selectedColor);
    newHistoryColor.appendChild(para);

    newHistoryColor.addEventListener('click', function () {
        // Update selected color to the click color in the history bar
        showIndColorPage(color);
        // document.getElementById('colorInput').value = color;
        currentPosition = position;
    });

    historyBar.appendChild(newHistoryColor);
    document.querySelector('.history').hidden = false;
}

document.querySelector('#notColor').addEventListener("click", () => {
    document.querySelector('#sureColor').hidden = true;

})

document.querySelector('#yesColor').addEventListener("click", () => {

    document.querySelector('#sureColor').hidden = true;

    color = selectedColor;
    history.push(color);
    currentPosition++;
    addColorToHistoryBar(color, currentPosition);
    showIndColorPage(color);
})
