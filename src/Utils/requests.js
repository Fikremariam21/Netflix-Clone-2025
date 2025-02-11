// This module acts as a central place to store and manage the URLs that your application uses to communicate with the TMDB API. By defining these URLs in a single file, you can easily reference them in different components without hardcoding the URLs multiple times. This can help maintain consistency and make it easier to update the URLs if needed.


const API_KEY = import.meta.env.VITE_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  // fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`, 
  // fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchTvShow: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  // fetchUpcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`

  
};

export default requests; 