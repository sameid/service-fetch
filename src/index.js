import kichiri from './Kichiri'

var kichiriApi = null;

export default function (json) {

	if (kichiriApi){
		return kichiriApi;
	}

	kichiriApi = kichiri.build(json);

	return kichiriApi;
}