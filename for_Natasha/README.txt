Color Season Identifier Microservice

This microservice takes a hex color and returns it's most closest season.

Data is requested by sending a HTTP request to the website that this microservice is hosted on. In the original form, it is `http://localhost:3001/season/?color=${color}`. In order to obtain a season back, you have to request the page with a color attribute in hex format without a hahstag'#'.
Data is then sent from the microservice to the requester with a JSON object of the original color and the season that color falls under. { original: color, season: colorSeason }

To set up the enviornment, you need to have node. You can install it by calling "npm init -y" and "npm install --save express request body-parser"
I start each of the microservices by typing "node (microservice name)". You can stop the microservice by pressing ctrl+c 
