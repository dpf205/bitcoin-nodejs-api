var express = require('express');
var router =  express.Router();

var request = require('request');
var bitcore = require('bitcore-lib');

router.post('/', function(req, res, next) {

	// console.log(brainsrc);

	var brainsrc = req.body.brainsrc;

	var input = new Buffer(brainsrc);

	var hash = bitcore.crypto.Hash.sha256(input)
	var bigNumber = bitcore.crypto.BN.fromBuffer(hash);

	var privateKey = new bitcore.PrivateKey(bigNumber).toWIF(); // WIF Wallet Import Format
	var address = new bitcore.PrivateKey(bigNumber).toAddress();

	request({
		address: address,
		url: `https://blockchain.info/address/${address}?format=json`,
		json: true
	}, function(error, response, body) {

		// console.log(body)
		res.render('brain-wallet-info',{
			pageTitle: "Brain Wallet Info",
			brainsrc: brainsrc,
			address: address,
			privateKey: privateKey,
			total_received: body.total_received.toFixed(2),
			total_sent: body.total_sent.toFixed(2),
			num_trans: body.n_tx,
			final_balance: body.final_balance.toFixed(2)
		})
	});
});


module.exports =  router;
