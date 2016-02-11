'use strict';

const express = require('express');
var app = express();
const session = require('express-session')
const FitbitApiClient = require("fitbit-node");
const config = require('./config.json');

let client = new FitbitApiClient(config.consumerKey, config.consumerSecret);
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
});

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/auth', function (req, res) {
 res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://MyFitbitStats.no-ip.org/callback'));
});

app.get('/callback', function (req, res) {
	  client.getAccessToken(req.query.code, 'http://MyFitbitStats.no-ip.org/callback').then(function (result) {
		client.get("/profile.json", result.access_token).then(function (results) {
			res.send(results[0]);
		});
	}).catch(function (error) {
		res.send(error);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

