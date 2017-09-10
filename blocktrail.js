// https://www.blocktrail.com/api/docs/lang/nodejs#installation

var api_key = 'd329ef841afcbe1d4e3d8934b7203cda64ddc47e';
var api_secret_key = '78f4b29ddd8e25f7c324a7288da7b11c4e93e3bc' ;
var blocktrail = require('blocktrail-sdk');

var client = blocktrail.BlocktrailSDK({
	apiKey: api_key,
	apiSecret: api_secret_key,
	network: "BTC",
	testnet: true
});

// get wallet info
client.initWallet("mywallet","mypass", function(err, wallet){
	// console.log(wallet);
	wallet.getNewAddress(function(err, address){
		console.log("\n Wallet Address: ", address, "\n");
	});
});

 // create a new wallet
// client.createNewWallet("mywallet", 'mypass', function(err, wallet, backupInfo){
// 	console.log('Wallet: ', wallet);
// 	console.log('Backup Info: ', backupInfo);
//
// });

// client.address('1NcXPMRaanz43b1kokpPuYDdk6GGDvxT2T',
//     function(err, address) {
// 		console.log(address.balance);
// 	});
//
// client.blockLatest(function(err, block) {
// 		 console.log(block.hash);
// 	 });
