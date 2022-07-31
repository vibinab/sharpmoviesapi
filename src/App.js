import React, { useCallback, useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
// import { Addmovie } from './components/Addmovie';
import AddMovie1 from './components/AddMovie1';

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

  const response= await fetch('https://sharpmovie-c455c-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')

  
  if(!response.ok){
    throw new Error('something went wrong ....Retrying')
  }

  const data = await response.json();

  // const data= await response.json();
  const loadedMovies=[];
  for(const key in data){
   loadedMovies.push({
     id:key,
     title:data[key].title,
     openingText:data[key].openingText,
     releaseDate:data[key].releaseDate,
   });
  }



 console.log(data)

  // const transformedMovies=data.results.map((movieData)=> {
  //       return {
  //         id:movieData.episode_id,
  //         title:movieData.title,
  //         openingText:movieData.opening_crawl,
  //         releaseDate:movieData.release_date
  //       }
  //     });
  //     console.log(transformedMovies)
      setmovies(loadedMovies)
     
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

  // const addmoviehandle=(name, desc)=> {
  //   console.log("app")
  //   console.log(name,desc)

  // }

  async function addMovieHandler(movie) {
    const response=await fetch('https://sharpmovie-c455c-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method:'POST',
      body:JSON.stringify(movie),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data=await response.json();
    console.log(data)
   
  }

// my code  
 function  deletemoviehandler(id){
  console.log("app rinn")
  console.log(id)
 }


  return (
    <React.Fragment>

      <AddMovie1 onAddMovie={addMovieHandler} />

       {/* <Addmovie onaddmovie={addmoviehandle}/> */}
      <section>
        <button onClick={fetchMoviesHanlder}>Fetch Movies</button>
      </section>
      <section>
       {
        !isloading && movies.length>0 && <MoviesList movies={movies}
        ondeletefromapp={deletemoviehandler}
         />
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
