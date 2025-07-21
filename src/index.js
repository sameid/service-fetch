'use strict';

import Kichiri from './Kichiri.js';
import { Toaster } from "react-hot-toast";

let instance = null;

export function loadServices({ apiDoc, host, useNativeFetch, areToastsEnabled = false }) {
	instance = new Kichiri(apiDoc, host, useNativeFetch, areToastsEnabled);
	return instance
}

export function getServices() {
	return instance.api;
}

export function setAuthToken(authToken) {
	instance.setAuthToken(authToken);
}

export { Toaster };