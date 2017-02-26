const moviesAPIPath = 'https://api.themoviedb.org/3';
const moviesAPIMethod = '/movie/popular';
const moviesAPIKey = '46270c06c4dcf45c52b9f26efbe2841d';

const ul = document.querySelector('ul');

const url = new URL(moviesAPIPath + moviesAPIMethod);
url.searchParams.append('api_key', moviesAPIKey);

fetch(url)
    .then(result => result.json())
    .then(showListOfMovies);


const APIurl = 'http://api.giphy.com/v1/gifs/search?q=',
    APIkey = '&api_key=dc6zaTOxFJmzC';

ul.style.lineHeight = '20px';

function showListOfMovies(data) {
    (data.results).forEach(movie => {
        const li = document.createElement('li'),
            btn = document.createElement('button');

        btn.innerHTML = 'see gif trailer';

        btn.style.height = '30px';

        const text = document.createTextNode(movie.title),
            movieAPI = new URL(APIurl + movie.title + APIkey);

        li.appendChild(btn);
        li.appendChild(text);
        ul.appendChild(li);


        fetch(movieAPI)
            .then(result => result.json())
            .then(addImg);
            //.then(data =>  console.log(data.data[0].url));


         function addImg(otherData) {
             const newImg = document.createElement('img');
             // newImg.setAttribute('src', otherData.data[0].images.fixed_height.url);

             newImg.src = otherData.data[0].images.fixed_height.url;

             li.appendChild(newImg);

             newImg.style.display = 'none';

             console.log(otherData.data[0].images.fixed_height.url);

             btn.addEventListener('click', showGif);

             function showGif(){

               if (newImg.style.display === 'none') {
                   newImg.style.display = 'block';
                   li.style.border = '2px solid black';
               }
               else {
                   newImg.style.display = 'none';
                   li.style.border = 'none';
               }
             }
        }
    });
}
