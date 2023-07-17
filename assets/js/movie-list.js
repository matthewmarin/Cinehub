'use strict';

import { api_key, fetchDataFromServer } from './api.js';
import { sidebar } from './sidebar.js';
import { createMovieCard } from './movie-card.js';
import { search } from './search.js';

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const pageTitle = urlParams.get('pageTitle');
const genreId = urlParams.get('genreId');

const pageContent = document.querySelector('[page-content]');

sidebar();

let currentPage = 1;
let totalPages = 0;


fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&with_genres=${genreId}`, function ({ results: movieList, total_pages }) {


    totalPages = total_pages;

    document.title = `${pageTitle} Movies - Cinehub`;

    const movieListElem = document.createElement('section');
    movieListElem.classList.add('movie-list', 'genre-list');
    movieListElem.ariaLabel = `${pageTitle} Movies`;

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">All ${pageTitle} Movies</h1>
        </div>

        <div class="grid-list"></div>

        <button class="btn load-more" load-more>Load More</button>
    `;


    //Add movie Card based on fetched item

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector('.grid-list').appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);


    //Load more button functionality

    document.querySelector('[load-more]').addEventListener('click', function () {

        if(currentPage >= totalPages) {
            this.style.display = 'none';
            return;
        }

        currentPage++;
        this.classList.add('loading');

        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${genreId}`, ({ results: movieList }) => {

            this.classList.remove('loading');

            for (const movie of movieList) {
                const movieCard = createMovieCard(movie);

                movieListElem.querySelector('.grid-list').appendChild(movieCard);
            }

        });

    })
});


search();