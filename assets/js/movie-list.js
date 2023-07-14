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

    const movieListElem = document.createElement('section');
    movieListElem.classList.add('movie-list', 'genre-list');
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">${genreName}</h1>
        </div>

        <div class="grid-list">
        
            <div class="movie-card">
                <figure class="poster-box card-banner">
                    <img src="./assets/images/slider-control.jpg" alt="Puss in Boots: The Last Wish" class="img-cover">
                </figure>

                <h4 class="title">Scary Movie</h4>

                <div class="meta-list">
                    <div class="meta-item">
                        <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="rating">
                        <span class="span">8.4</span>
                    </div>

                    <div class="card-badge">2022</div>
                </div>

                <a href="./detail.html" class="card-btn" title="Puss in Boots: The Last Wish"></a>
            </div>

        </div>

            <button class="btn load-more" load-more>Load More</button>
    `;


    //Add movie Card based on fetched item

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector('.grid-list').appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);
});