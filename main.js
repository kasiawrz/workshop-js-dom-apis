const moviesAPIPath = 'https://api.themoviedb.org/3';
const moviesAPIMethod = '/movie/popular';
const moviesAPIKey = '46270c06c4dcf45c52b9f26efbe2841d';

const ul = document.querySelector('ul');

const url = new URL(moviesAPIPath + moviesAPIMethod);
url.searchParams.append('api_key', moviesAPIKey);

fetch(url)
  .then(result => result.json())
  .then(showListOfMovies);

function showListOfMovies(data) {
  (data.results).forEach(movie => {
    const li = document.createElement('li');
    const text = document.createTextNode(movie.title);

    li.appendChild(text);
    ul.appendChild(li);
  });
}
