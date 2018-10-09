'use strict';

import kichiri from './Kichiri'

var kichiriApi = null;

export default function (json, host, useNativeFetch) {

	if (kichiriApi){
		return kichiriApi;
	}

	kichiriApi = kichiri.build(json, host, useNativeFetch);

	return kichiriApi;
}
