// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/o", function (request, response) {
  response.sendFile(__dirname + '/public/o.html');
});

app.get("/f", function (request, response) {
  response.sendFile(__dirname + '/public/f.html');
});

app.get("/r", function (request, response) {
  response.sendFile(__dirname + '/public/r.html');
});

app.get("/try", function (request, response) {
  response.sendFile(__dirname + '/views/try.html');
});

app.get("/u", function (request, response) {
  response.sendFile(__dirname + '/public/dashboard.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
