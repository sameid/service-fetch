const kichiri1 = require('../dist');
const api = require('./api');
const KichiriInstance = new kichiri1.default(api, "http://localhost:3001/api");

let Kichiri = KichiriInstance.api;

Kichiri.addErrorInterceptor(function(error) {
    console.log("hello", error);
})

Kichiri
	.user
	.login()
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	})
