
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


 



// import React, { useState, useEffect, useCallback } from 'react';
// import axios from '../../../Utils/axios';
// import movieTrailer from 'movie-trailer';
// import YouTube from 'react-youtube';
// import styles from './Row.module.css';

// const base_url = 'https://image.tmdb.org/t/p/original';

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!fetchUrl) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const request = await axios.get(fetchUrl);
//         setMovies(request.data.results || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [fetchUrl]);

//   const handleClick = useCallback((movie) => {
//     const fetchTrailer = async () => {
//       try {
//         const url = await movieTrailer(movie?.title || movie?.name || movie?.original_name);
//         const urlParams = new URLSearchParams(new URL(url).search);
//         setTrailerUrl(urlParams.get('v'));
//       } catch (error) {
//         console.log('Trailer not found', error);
//         setTrailerUrl('');
//       }
//     };

//     if (trailerUrl) {
//       setTrailerUrl('');
//     } else {
//       fetchTrailer();
//     }
//   }, [trailerUrl]);

//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: { autoplay: 1 },
//   };

//   if (isLoading) {
//     return (
//       <div className={styles.row}>
//         <h1>{title}</h1>
//         <div className={styles.row_posters}>
//           <div className={styles.loading}>Loading Movies...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.row}>
//       <h1>{title}</h1>
//       <div className={styles.row_posters}>
//         {movies.map((movie, index) => (
//           <img
//             key={index}
//             onClick={() => handleClick(movie)}
//             src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
//             alt={movie.name}
//             className={`${styles.row_poster} ${isLargeRow ? styles.row_posterLarge : ''}`}
//           />
//         ))}
//       </div>
//       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//     </div>
//   );
// };

// export default Row;




































































































































// import React, { useState, useEffect, useCallback } from 'react';
// import axios from '../../../Utils/axios';
// import movieTrailer from 'movie-trailer';
// import YouTube from 'react-youtube';
// import styles from './Row.module.css';
// import Slider from "react-slick"; // Import Slider
// import "slick-carousel/slick/slick.css"; // Import CSS for slick-carousel
// import "slick-carousel/slick/slick-theme.css"; // Import theme CSS (optional, but recommended)

// const base_url = 'https://image.tmdb.org/t/p/original';

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!fetchUrl) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const request = await axios.get(fetchUrl);
//         setMovies(request.data.results || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [fetchUrl]);

//   const handleClick = useCallback((movie) => {
//     const fetchTrailer = async () => {
//       try {
//         const url = await movieTrailer(movie?.title || movie?.name || movie?.original_name);
//         const urlParams = new URLSearchParams(new URL(url).search);
//         setTrailerUrl(urlParams.get('v'));
//       } catch (error) {
//         console.log('Trailer not found', error);
//         setTrailerUrl('');
//       }
//     };

//     if (trailerUrl) {
//       setTrailerUrl('');
//     } else {
//       fetchTrailer();
//     }
//   }, [trailerUrl]);

//   const opts = {
//     height: '390',
//     width: '100%',
//     playerVars: { autoplay: 1 },
//   };

//   const settings = { // Configuration for the Slider component
//     dots: false,         // Hide navigation dots
//     infinite: false,     // Disable infinite loop
//     speed: 500,          // Transition speed
//     slidesToShow: 5,     // Number of slides to show at a time
//     slidesToScroll: 5,   // Number of slides to scroll
//     responsive: [       // Responsive settings
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: false,
//           dots: false
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: false,
//           dots: false
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: false,
//           dots: false
//         }
//       }
//     ]
//   };

//   return (
//     <div className={styles.row}>
//       <h1>{title}</h1>

//       {isLoading ? ( // Show loading indicator while data is loading
//         <div className={styles.row_posters}>
//           <div className={styles.loading}>Loading Movies...</div>
//         </div>
//       ) : ( // Show the Slider (carousel) component once data is loaded
//         <Slider {...settings}>  {/* Add slider with settings */}
//           {movies.map((movie, index) => (
//             <div key={index}> {/* Add a wrapper div for each movie - Required by react-slick */}
//               <img
//                 onClick={() => handleClick(movie)}
//                 src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
//                 alt={movie.name}
//                 className={`${styles.row_poster} ${isLargeRow ? styles.row_posterLarge : ''}`}
//               />
//             </div>
//           ))}
//         </Slider>
//       )}

//       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//     </div>
//   );
// };

// export default Row;
