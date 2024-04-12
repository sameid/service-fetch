'use strict';

import utils from './Utils';
import axios from 'axios';
import _ from 'underscore';
import withQuery from 'with-query';
import yaml from 'js-yaml';

class Kichiri {

	constructor(yamlString, host, useNativeFetch) {
		this.api = {};
		this.host = null;
		this.doc = null;
		this.useNativeFetch = false;
		this.interceptors = [];
		this.axiosInstance = axios.create();

		if (!yamlString || yamlString === '') {
			return {};
		}

		var json = null;

		try {
			json = yaml.safeLoad(yamlString, 'utf8');
		}
		catch (error) {
			console.log('An error occured trying to parse DemandHub API YAML.');
			console.log(error);
			return null;
		}

		this.useNativeFetch = useNativeFetch;

		var scheme = json.schemes.indexOf('https') != -1 ? 'https://' : 'http://';
		this.host = host || (scheme + json.host + (json.basePath || ""));

		this.doc = json;
		this.init();

		this.initializeInterceptors();
		this.api.interceptors = this.interceptors;
		this.api.addErrorInterceptor = this.addErrorInterceptor;

	}

	/**
	 * Uses Axios to initialize a list of interceptors that should be called on 401 response
	 *
	 */
	initializeInterceptors() {
		axios.interceptors.response.use((response) => {
			return response;
		}, (error) => {
			this.interceptors.forEach(function (cb) {
				if (typeof cb === 'function') {
					cb(error);
				}
			})
			return Promise.reject(error);
		})
	}

	/**
	 * Appends a Callback function to the list of local interceptors
	 *
	 * @param {Function} cb
	 */
	addErrorInterceptor(cb) {
		if (typeof cb === 'function') {
			this.interceptors.push(cb);
		}
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
				(self.api[namespace])[innerValue.operationId] = function(data, queryParams, authToken, headers = {}) {
					return self.trigger(key, innerKey, data, queryParams, authToken, headers);
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
	trigger(path, method, data, queryParams, authToken, headers = {}) {
		var self = this;

		let url = self.host + utils.replaceInPath(path, data);

		Object.assign(headers, {
			'Content-Type': 'application/json',
			'Authorization': authToken || ""
		})

		if (method.toLowerCase() === 'get' && self.useNativeFetch) {
			return fetch(withQuery(url, queryParams), {
				method: method,
				headers: headers
			}).then(function (response) {

				if (!response.ok) {
					self.interceptors.forEach(function (cb) {
						if (typeof cb === 'function') {
							cb(response);
						}
					})
				}

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
			headers: headers,
			data: data || {},
			params: queryParams || {},
		});
	}

}

export default Kichiri;
