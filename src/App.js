import React, { useCallback, useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setmovies]=useState([]);

  const[error,seterror]=useState(null)

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

 
  

const fetchMoviesHanlder=useCallback( async()=> {

  setisloading(true)
  seterror(null)
try {

  const response= await fetch('https://swapi.dev/api/films/')

  
  if(!response.ok){
    throw new Error('something went wrong ....Retrying')
  }

  const data = await response.json();

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
     
    }

    catch(error){
      seterror(error.message)
    }
    setisloading(false)
},[]);

useEffect(()=> {
  fetchMoviesHanlder()
}, [fetchMoviesHanlder]);

  
  
if(error){
  console.log("error")
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
        !isloading && movies.length===0 && !error && <p>click on fetch button</p>
       }
       {
        isloading && <p>loading</p>
       }
       {
        !isloading && error && <p>{error}</p>
       }
      </section>
    </React.Fragment>
  );
}

export default App;
