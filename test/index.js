const kichiri1 = require('../dist');
const api = require('./api');
const Kichiri = new kichiri1.default(api, "http://localhost:3001");

console.log(Kichiri);

// kichiri
// 	.user
// 	.login()
// 	.then(function(response) {
// 		console.log(response);
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	})
