// This Module, provides a pre-configured axios instance. This instance is used to make API requests to the TMDB API. The baseURL is set to "https://api.themoviedb.org/3/", which is the base URL for the TMDB API. This instance can be imported and used in different components to make API requests to the TMDB API.axios.jsimport axios from "axios";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default instance;

