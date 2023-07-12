'use strict';

// Add event Elements

const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
}

// Toggle Search box in mobile devices

const searchBox = document.querySelector('[search-box]');
const searchTogglers = document.querySelectorAll('[search-toggler]');

addEventOnElements(searchTogglers, 'click', function () {
    searchBox.classList.toggle('active');
});


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGEzMzBhNWExNWY2MDEyODliYmEyNDk3ZmMyYTY5OSIsInN1YiI6IjY0YTkzY2NhNjZhMGQzMDEzYTcxZDJiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l4dxBhQon7e8Pt1NBSzJdvLu1UxLoqYgxCUH0-aOA2E'
    }
  };
  
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));