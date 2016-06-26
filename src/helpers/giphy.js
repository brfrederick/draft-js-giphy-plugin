import Promise from 'bluebird';

const BASE_URL = 'https://api.giphy.com';
var API_KEY = '';

const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const GiphyEndpoint = {
    search: '/v1/gifs/search',
    trending: '/v1/gifs/trending'
};

var _scrub = (json) => {
	if (!Array.isArray(json)) {
		throw new Error(`Expected an array of objects, got a ${typeof json}`);
	}
	return json.map(function (raw, index) {
		var gif = {
			id: raw.id,
			url: raw.images['original'].url,
			width: raw.images['original'].width,
			height: raw.images['original'].height
		};
		return gif;
	});
}

var _urlFormat = (params) => {
    var str = '?';
    if (params) {
        Object.keys(params).forEach(function(key) {
            const value = encodeURIComponent(params[key] || '');
            str += `${key}=${value}&`
        });
    }
    str += `api_key=${API_KEY}`
    return str;
};

var _apiCall = (endpoint, method, params) => {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        const url = BASE_URL + endpoint + _urlFormat(params);

        xhr.open(method, url);

        xhr.onload = function(event) {
        	if (this.status === 200) {
	            try {
	                var json = JSON.parse(xhr.responseText);
	                var giphyData = _scrub(json.data);
                    giphyData.searchTerm = params.q;
	                resolve(giphyData);
	            } catch (error) {
	                reject(error);
	            }
        	} else {
        		reject (this.status);
        	}
        };

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send();
    });
};

export default class Giphy {
    constructor(apiKey) {
        API_KEY = apiKey;
    }
    search(searchTerm, options) {
    	options = options || {}
        const params = {
            q: searchTerm || '',
            limit: options.limit || 25,
            offset: options.offset || 0,
            rating: options.rating || 'pg'
        };
        return _apiCall(GiphyEndpoint.search, HttpMethod.GET, params);
    }
    trending(options) {
    	options = options || {};
    	const params = {
    		limit: options.limit || 25,
    		rating: options.rating || 'pg',
    	};
        return _apiCall(GiphyEndpoint.trending, HttpMethod.GET, params);
    }
}
