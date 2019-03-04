'use strict';

import utils from './Utils';
import axios from 'axios';
import _ from 'underscore';
import withQuery from 'with-query';

class Kichiri {

	constructor(json, host, useNativeFetch) {
		this.api = {};
		this.host = null;
		this.doc = null;
		this.useNativeFetch = false;

		if (!json || json === '') {
			return {};
		}

		this.useNativeFetch = useNativeFetch;

		var scheme = json.schemes.indexOf('https') != -1 ? 'https://' : 'http://';
		this.host = host || (scheme + json.host + (json.basePath || ""));

		this.doc = json;
		this.init();
		// return this.api;
	}

	/**
	 * Create the api interface for calling different routes.
	 *
	 */
	init() {
		var self = this;

		// Iterate through all the paths defined in the swagger api doc.
		_.each(self.doc.paths, function(value, key) {
			_.each(value, function(innerValue, innerKey) {

				// Get the namespace for the current route promise that needs to be created. (eg. this.api.[messages])
				var namespace = utils.getNamespace(innerValue, key, self.doc.basePath);

				// If the namespace does not exist, create a new empty object for it.
				if (!self.api[namespace]) {
					self.api[namespace] = {}
				}

				// If the route has no operation id defined, use it's method as the operation id.
				if (!innerValue.operationId) {
					innerValue.operationId = innerKey;
				}

				// Create the promise based function for the route, based on the namespace and operation id. (eg. this.api.[messages].[list])
				(self.api[namespace])[innerValue.operationId] = function(data, queryParams, authToken) {
					return self.trigger(key, innerKey, data, queryParams, authToken);
				}

			})
		})
	}

	/**
	 * Create the trigger function for when an operationId is called.
	 *
	 * @param path {String} - the full path of the route (eg. /some/special/endpoint/{param})
	 * @param method {String} - the method for the route (ie. POST, GET, PUT, DELETE ...)
	 * @param data {Object} - object for the data that needs to be passed.
	 * @param queryParams {Object} - object for the query params that could be passed.
	 * @param authToken {String} - Token used to authenticate the api back end.
	 * @return {Promise}
	 */
	trigger(path, method, data, queryParams, authToken) {
		var self = this;

		let url = self.host + utils.replaceInPath(path, data);

		if (method.toLowerCase() === 'get' && self.useNativeFetch) {
			return fetch(withQuery(url, queryParams), {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': authToken || ""
				}
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				return {
					data: data
				}
			})
		}

		return axios({
			method: method,
			url: self.host + utils.replaceInPath(path, data),
			headers: {
				'Content-Type': 'application/json',
				'Authorization' : authToken || ""
			},
			data: data || {},
			params: queryParams || {},
		});
	}

}

export default Kichiri;
