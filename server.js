var express = require('express');
var app = express();

var homeRoute = require('./routes/index');
var converterRoute = require('./routes/converter');
var check_bitcore_wallet = require('./routes/check-bitcore-wallet');

var bodyParser = require('body-parser');

var request = require('request');
var bitcore = require('bitcore-lib');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use('/', homeRoute);
app.use('/converter', converterRoute)
app.use('/check-bitcore-wallet', check_bitcore_wallet);



app.listen(port, function() {
	console.log(`\n express server on port ${port}`);
});
