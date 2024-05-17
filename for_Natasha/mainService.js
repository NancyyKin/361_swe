const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/color', (req, res) => {
    const color = req.body.color;

    console.log("Sending this color over to the microservice:", color);

    request(`http://localhost:3001/season?color=${color}`, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        const colorSeason = body.season;
        res.send({ original: color, season: colorSeason });


    });
});


app.listen(3000, () => console.log('Main Service listening on port 3000!'));