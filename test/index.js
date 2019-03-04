const api = require('./api');
const api2 = require('./api2');
const kichiri1 = require('../dist').default(api, "http://localhost:3001");
const kichiri2 = require('../dist').default(api2, "http://localhost:4001");

console.log(kichiri1);
console.log(kichiri2);

// kichiri
// 	.user
// 	.login()
// 	.then(function(response) {
// 		console.log(response);
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	})
