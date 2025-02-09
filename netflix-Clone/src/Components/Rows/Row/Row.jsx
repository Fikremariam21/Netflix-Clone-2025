
import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../../Utils/axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import styles from './Row.module.css';

const base_url = "https://image.tmdb.org/t/p/original"; // Base URL for constructing image URLs

const Row = ({ title, fetchUrl, isLargeRow }) => { // Component props: title, API endpoint (fetchUrl), and flag for larger posters (isLargeRow)
  const [movies, setMovies] = useState([]); // State variable to store the array of movies fetched from the API
  const [trailerUrl, setTrailerUrl] = useState(''); // State variable to store the YouTube trailer URL

  // 1. Fetch Movies (useEffect): Fetches movie data from the API when the component mounts or when 'fetchUrl' changes
  useEffect(() => {
    if (!fetchUrl) return; // If there's no fetchUrl, don't do anything

    const fetchData = async () => { // Async function to fetch and process data
      try {
        const request = await axios.get(fetchUrl); // Make the API request using Axios
        setMovies(request.data.results || []); // Update the 'movies' state with the fetched data or an empty array if 'results' is undefined
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors to the console
        // Consider displaying an error message to the user
      }
    };

    fetchData(); // Call the async function
  }, [fetchUrl]); // useEffect dependency: Run this effect whenever 'fetchUrl' changes

  // 2. Handle Movie Click: Handles the click event on a movie poster to fetch and display the trailer
  const handleClick = useCallback((movie) => {
    const fetchTrailer = async () => {
      try {
        const url = await movieTrailer(movie?.title || movie?.name || movie?.original_name); // Use the movie-trailer package to find the YouTube trailer URL
        const urlParams = new URLSearchParams(new URL(url).search); // Create a URLSearchParams object to extract the 'v' parameter (video ID) from the URL
        setTrailerUrl(urlParams.get('v')); // Update the 'trailerUrl' state with the video ID
      } catch (error) {
        console.log("Trailer not found", error); // Log a message if the trailer is not found
        setTrailerUrl(''); // Clear any existing trailer URL
        // Consider displaying a "Trailer Not Found" message to the user
      }
    };

    if (trailerUrl) {
      setTrailerUrl(''); // If a trailer is already open, close it
    } else {
      fetchTrailer(); // Otherwise, fetch the trailer
    }
  }, [trailerUrl]);

  // 3. YouTube Options
  const opts = {
    height: "390",  
    width: "100%",  
    playerVars: {
      autoplay: 1,  
    },
  };

  return (
    <div className={styles.row}> 
      <h1>{title}</h1> {/* Display the title of the row */}

      <div className={styles.row_posters}> {/* Container for the movie posters */}
        {movies?.map((movie, index) => ( // Map over the 'movies' array to render each movie
          <img
            key={index} // Unique key for each movie (required by React)
            onClick={() => handleClick(movie)} // Attach the handleClick function to the onClick event
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} // Construct the image URL
            alt={movie.name} // Alt text for accessibility
            className={`${styles.row_poster} ${isLargeRow ? styles.row_posterLarge : ""}`}
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} {/* Render the YouTube player if 'trailerUrl' has a value */}
    </div>
  );
};

export default Row;