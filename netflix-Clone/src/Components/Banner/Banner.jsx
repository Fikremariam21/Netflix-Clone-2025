// import React, { useEffect, useState } from 'react';
// import axios from '../../Utils/axios';
// import requests from '../../Utils/requests';
// // import axios from 'axios';
// // import  styles from './Banner.module.css'

// const Banner = () => {
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const request = await axios.get(requests.fetchNetflixOriginals);
//         setMovie(
//           request.data.results[
//             Math.floor(Math.random() * request.data.results.length)
//           ]
//         );
//         console.log(request);
//       } catch (error) {
//         console.log("error", error);
//       }
//     }
//     fetchData();
//   }, []);

//   // Function to truncate the overview
//   function truncate(str, n) {
//     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
//   }

//   return (
//     <div
//       className="banner"
//       style={{
//         backgroundSize: "cover",
//         backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
//         backgroundPosition: "center",  // Corrected: Added position
//         backgroundRepeat: "no-repeat",
        
//       }}
//     >
//       <div className="banner_contents">
//         <h1 className="banner_title">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>

//         <div className="banner_buttons">
//           <button className="banner_button banner_button_play">Play</button>
//           <button className="banner_button">List</button>
//         </div>

//         <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
//       </div>
//       <div className="banner--fadeBottom" />  {/* Fading Effect */}
//     </div>
//   );
// };

// export default Banner;







import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../Utils/axios';
import requests from '../../Utils/requests';
import styles from './Banner.module.css'

const Banner = () => {
  const [movie, setMovie] = useState(null); // null is falsy and help us to trigger if (!movie) condition

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(requests.fetchNetflixOriginals);
      if (data?.results?.length) {
        setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // The empty dependency array [] means that fetchData will be called once, and then the effect will not run again unless there is a change in the component’s state or props

  const truncate = (str, n) => (str?.length > n ? str.slice(0, n - 1) + "..." : str);

  if (!movie) return null; // Prevent rendering before data loads
// Destructuring the Movie Object
  const { title, name, original_name, overview, backdrop_path } = movie;

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${backdrop_path ?? ""}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.banner_contents}>
        <h1 className={styles.banner_title}>{title ?? name ?? original_name}</h1>

        <div className={styles.banner_buttons}>
          <button className={`${styles.banner_button}${styles.banner_button} ${styles.play}`}>Play</button>
          <button className={styles.banner_button}>List</button>
        </div>

        <h1 className={styles.banner_description}>{truncate(overview, 150)}</h1>
      </div>
      <div className= {styles.banner_fadeBottom} />
    </div>
  );
};

export default Banner;
