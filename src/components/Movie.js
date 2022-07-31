import React from 'react';

import classes from './Movie.module.css';



const Movie = (props) => {

  console.log("movie",props)
  const deletehandler=(data)=> {
    props.deletefrommovelist(data)
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button type="button" onClick={()=>deletehandler(props.title)}>Delete</button>
    </li>
  );
};

export default Movie;
