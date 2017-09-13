var express = require('express');
var router = express.Router();
var request = require('request');
var bitcore = require('bitcore-lib');


router.get('/', function(req, res, next) {

	request({
		url: "https://blockchain.info/ticker?format=json",
		json: true
	}, function(error, response, body) {

		var buyPrice = body.USD.buy;
		var sellPrice = body.USD.sell;
		var spreadDiff = buyPrice - sellPrice;
		var spread = spreadDiff.toFixed(2);

		res.render('index', {
			pageTitle: "BTC Convert",
			last_price: body.USD.last,
			bid_price: body.USD.buy,
			ask_price: body.USD.sell,
			spread: spread
		});
	});
});


module.exports = router;
