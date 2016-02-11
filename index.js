'use strict';

const express = require('express');
var app = express();
const exphbs  = require('express-handlebars');
const session = require('express-session')
const FitbitApiClient = require("fitbit-node");
const config = require('./config.json');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let client = new FitbitApiClient(config.clientId, config.consumerSecret);
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

app.get('/', function (req, res) {
	let sess = req.session;
	let data = {
		"access_token": sess.access_token
	}
	res.render('home', data);
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

app.listen(30666, function () {
  console.log('Example app listening on port 3000!');
});

