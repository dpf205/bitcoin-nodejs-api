var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var bitcore = require('bitcore-lib');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");


app.get('/', function(req, res) {

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

// app.get('/brain', function(req,res){
// 	res.render('brain', {
// 		pageTitle: "Brain"
// 	})
// });

app.get('/converter', function(req,res){

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



app.post('/create-bitcore-wallet', function(req, res) {

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
		res.send('This is the brain wallet of ' + '<b>' + brainsrc + '</b>' +
			'<br>Address: ' + address +
			'<br>Private Key Hash: ' + privateKey +
			'<br> Total Received: ' + body.total_received +
			'<br> Total Sent: ' + body.total_sent +
			'<br> Number of Transactions: ' + body.n_tx +
			'<br> Final Balance: ' + body.final_balance
		);
	})


});

app.listen(port, function() {
	console.log(`\n express server on port ${port}`);
});
