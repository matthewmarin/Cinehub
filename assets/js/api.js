'use strict';

const api_key = 'f4a330a5a15f601289bba2497fc2a699';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

const fetchDataFromServer = function(url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, fetchDataFromServer };

