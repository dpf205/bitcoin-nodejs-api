var http  = require('http');
var request =  require('request');

var port = process.env.PORT || 3000;

http.createServer(function (req, res){

   request({
	   url:"https://blockchain.info/stats?format=json",
	   json: true
   }, function(error, response, body){
	   console.log(body.market_price_usd);
   });
	console.log("this is a new bitcoin user" + req.url);
	res.end("more bitcoin info");

}).listen(port);
