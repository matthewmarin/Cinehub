'use strict';

import { api_key, fetchDataFromServer } from './api.js';
import { sidebar } from './sidebar.js';
import { createMovieCard } from './movie-card.js';

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const genreName = urlParams.get('genreName');
// const genre = urlParams.get('genre');


// collect genre name & url parameters
const genreName = window.localStorage.getItem('genreName');
const genre = window.localStorage.getItem('genre');
const pageContent = document.querySelector('[page-content]');

sidebar();

let currentPage = 1;
let totalPages = 0;

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${genre}`, function ({ results: movieList, total_pages }) {


    totalPages = total_pages;

    document.title = `${genreName} Movies - Cinehub`;
});