const moviesAPIPath = 'https://api.themoviedb.org/3';
const moviesAPIMethod = '/movie/popular';
const moviesAPIKey = '46270c06c4dcf45c52b9f26efbe2841d';

const giphyAPIPath = 'http://api.giphy.com/v1';
const giphyAPIMethod = '/gifs/search';
const giphyAPIKey = 'dc6zaTOxFJmzC';

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
    const button = document.createElement('button');
    button.innerHTML = 'See trailer';
    button.addEventListener('click', () => showTrailer(li, movie.title));

    li.appendChild(text);
    li.appendChild(button);
    ul.appendChild(li);
  });
}

function showTrailer(li, title) {
  const url = new URL(giphyAPIPath + giphyAPIMethod);
  url.searchParams.append('api_key', giphyAPIKey);
  url.searchParams.append('q', '"' + title + '" trailer');
  url.searchParams.append('limit', 1);

  fetch(url)
    .then(result => result.json())
    .then(json => {
      if (json.data.length) {
        var img = document.createElement('img');
        img.src = json.data[0].images.fixed_height.url;
        li.appendChild(document.createElement('br'));
        li.appendChild(img);
      }
    });
}