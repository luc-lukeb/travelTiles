var apiKeys = require('./apiKeys.js')

var flickrAccount = "36587311@N08";
var flickrNrOfPhotos = "10";

var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});
app.use(express.compress());
app.use("/",express.static(__dirname + '/public'));

//http
var request = require('request');

/**
 * Queries expedia for given location and sends back JSON file
 */
app.get('/goExpedia/', function(req, res){
	
	var aParams = {
			apiKey : apiKeys.Expedia,
			latitude : req.query.latitude,
			longitude : req.query.longitude,
			_type : "json",

		}
	
	request.get({
		url : 'http://api.ean.com/ean-services/rs/hotel/v3/list',
		qs : aParams
	}, function(error, requestResponse, body) {
		res.send(body);
	});
	});

/**
 * Gets photos from flickr
 */
app.get('/getPhotos/', function(req, res){
	
	var aParams = {
		method : "flickr.people.getPublicPhotos",
		api_key : apiKeys.Flickr,
		user_id : flickrAccount,
		per_page : flickrNrOfPhotos,
		extras : "geo",
		format : "json",
		nojsoncallback : "1"
	}
	
	request.get({
		url : 'http://api.flickr.com/services/rest/',
		qs : aParams
	}, function(error, requestResponse, body) {
		res.send(body);
	});
	});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port '+port);