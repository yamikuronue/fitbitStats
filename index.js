'use strict';

const express = require('express');
var app = express();
const exphbs  = require('express-handlebars');
const session = require('express-session')
const FitbitApiClient = require("fitbit-node");
const config = require('./config.json');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('static'));

let client = new FitbitApiClient(config.clientId, config.consumerSecret);
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 3600000
	}
}));

app.get('/', function (req, res) {
	let sess = req.session;
	let data = {
		"access_token": sess.access_token,
		"profile": sess.profile
	};
	res.render('home', data);
});

app.get('/hr', function (req, res) {
	let sess = req.session;
	let data = {
			"access_token": sess.access_token,
			"profile": sess.profile
	};

	if (!sess.access_token) {
		res.redirect("/");
		return;
	}
	client.get("/activities/heart/date/today/1d/1min.json", sess.access_token).then(function (result) {
		if (result[0].errors) {
			Promise.reject(result[0].errors[0].message);
		};

		data.dataDaily = JSON.stringify(result[0]["activities-heart-intraday"].dataset);
	})
	.then(() => { return client.get("/activities/heart/date/today/7d.json", sess.access_token)})
	.then(function(result) {
		 if (result[0].errors) {
                        Promise.reject(result[0].errors[0].message);
                };

		data.dataWeekly = JSON.stringify(result[0]);
		res.render('hr',data);
	}).catch(function (error) {
		res.send("ERROR:" + error.toString() + "<br>" +  error.stack);
	});
	
});

app.get('/auth', function (req, res) {
 res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://MyFitbitStats.no-ip.org/callback'));
});

app.get('/callback', function (req, res) {
	  client.getAccessToken(req.query.code, 'http://MyFitbitStats.no-ip.org/callback').then(function (result) {
		req.session.access_token = result.access_token;
		client.get("/profile.json", result.access_token).then(function (results) {
            req.session.profile = JSON.stringify(results);
			req.session.name = results[0].user.displayName;
			req.session.avatar = results[0].user.avatar;
			res.redirect('/');
        });

	}).catch(function (error) {
		res.send(error);
	});
});

app.listen(30666, function () {
  console.log('Example app listening on port 3000!');
});

