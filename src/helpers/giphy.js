import Promise from 'bluebird';

const BASE_URL = 'http://api.giphy.com';

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
    return str;
};

var _apiCall = (endpoint, method, params) => {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        const url = BASE_URL + endpoint + _urlFormat(params);

        xhr.open(method, url);

        xhr.onabort = function(event) {
            reject(event);
        };
        xhr.onerror = function(event) {
            reject(event);
        }
        xhr.onload = function() {
            try {
                var json = JSON.parse(xhr.responseText);
                var giphyData = _scrub(json.data); 
                resolve(giphyData);
            } catch (error) {
                reject(error);
            }
        };

        xhr.send();
    });
};

export default class Giphy {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    search(searchTerm, options) {
        const params = {
            q: searchTerm || '',
            limit: options.limit || 25,
            offset: options.offset || 0,
            rating: options.rating || 'pg'
        };
        return _apiCall(GiphyEndpoint.search, HttpMethod.GET, params);
    }
    trending(options) {
    	const params = {
    		limit: options.limit || 25,
    		rating: options.rating || 'pg',
    	};
        return _apiCall(GiphyEndpoint.trending, HttpMethod.GET, params);
    }
}
