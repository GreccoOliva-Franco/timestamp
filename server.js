// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// date parser getter
app.get("/api/:date?", (req, res) => {
	const data = req.params.date;
	let response = {};
	let ms;
	let dateString;

	if ( data === undefined ) {
		date = new Date();
		ms = date.getTime();
		dateString = date.toUTCString();

		response = {'unix': ms, 'utc': dateString};
	} else if ( /^\d*$/.test(data)) {
		ms = parseInt(data);
		date = new Date(ms);
		dateString = date.toUTCString();

		response = {'unix': ms, 'utc': dateString};
	} else {
		ms = Date.parse(data);
		date = new Date(ms);
		dateString = date.toUTCString();

		if ( dateString == 'Invalid Date' ) {
			response = {'error': "Invalid Date"};
		} else {
			response = {'unix': ms, 'utc': dateString};
		}
	}

	res.json(response)
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});