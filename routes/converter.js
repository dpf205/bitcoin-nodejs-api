var express = require('express');
var router = express.Router();
var request = require('request');
var bitcore = require('bitcore-lib');


router.get('/', function(req,res, next){
	request({
		url: "https://blockchain.info/ticker?format=json",
		json: true
	}, function(error, response, body) {
			res.render('converter', {
				pageTitle: "BTC/USD or USD/BTC",
				last_price: body.USD.last
			});
	});
});

module.exports =  router;
