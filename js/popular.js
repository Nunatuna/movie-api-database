import { BASE_URL, options } from "./info.js";

const MAX_MOVIES = 6;
const fragment = document.createDocumentFragment();

// Fetch once, then slice the first 5 movies
try {
  const res = await fetch(`${BASE_URL}/popular?language=en-US&page=1`, options);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  const movies = data.results.slice(0, MAX_MOVIES);

  movies.forEach(movie => {
    const movieCard = document.querySelector('#movie-card').content.cloneNode(true);

    movieCard.querySelector('h3').innerText = movie.title;

    const poster = movieCard.querySelector('img');
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    poster.setAttribute('alt', movie.title);

    movieCard.querySelector('.movie-overview').innerText = movie.overview;
    movieCard.querySelector('.movie-title').innerText = movie.title;
    movieCard.querySelector('.movie-release').innerText = movie.release_date;

    fragment.append(movieCard);
  });

  document.querySelector('#movie-list').append(fragment);
} catch (err) {
  console.error("Fetch error:", err);
}