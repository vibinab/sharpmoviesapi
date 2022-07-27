import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setmovies]=useState([])

  const [isloading, setisloading]=useState(false)

  // function fetchMoviesHanlder() {
  // fetch('https://swapi.dev/api/films/')
  // .then(response=> {
  //   return response.json();
  // }).then(data=> {
  //   console.log(data)
  //   const transformedMovies=data.results.map(movieData=> {
  //     return {
  //       id:movieData.episode_id,
  //       title:movieData.title,
  //       openingText:movieData.opening_crawl,
  //       releaseDate:movieData.release_date
  //     }
  //   });
  //   console.log(transformedMovies)
  //   setmovies(transformedMovies)
  // })

  // }

async function fetchMoviesHanlder() {

  setisloading(true)

  const response= await fetch('https://swapi.dev/api/films/')

  const data = await response.json()

  const transformedMovies=data.results.map((movieData)=> {
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      });
      console.log(transformedMovies)
      setmovies(transformedMovies)
      setisloading(false)
    }
  





  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHanlder}>Fetch Movies</button>
      </section>
      <section>
       {
        !isloading && movies.length>0 && <MoviesList movies={movies} />
       } 
       {
        !isloading && movies.length===0 && <p>click on fetch button</p>
       }
       {
        isloading && <p>loading</p>
       }
      </section>
    </React.Fragment>
  );
}

export default App;
