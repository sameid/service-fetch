'use strict';

import Kichiri from './Kichiri.js';

let instance = null;

export function loadServices({ apiDoc, host, useNativeFetch }) {
	instance = new Kichiri(apiDoc, host, useNativeFetch);
	return instance
}

export function getServices() {
	return instance.api;
}

export function setAuthToken(authToken) {
	instance.setAuthToken(authToken);
}
