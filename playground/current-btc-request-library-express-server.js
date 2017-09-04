var express = require('express');
var app =  express();
var port =  process.env.PORT || 3000;
var request = require('request');

app.get('/', (req, res) => {
	request({
		url: 'https://blockchain.info/ticker?format=json',
		json: true
	}, (error, response, body) => {
		console.log(body.USD.last);
		res.end();
	});
});


app.listen(port, ()=>{
	console.log(`\n Express server connected on port ${port} \n`);
})
