import React, { useState } from 'react'

export const Addmovie = (props) => {

const [name, setname]=useState('');

const [desc, setdesc]= useState('') 

const namehandler=(event) => {
    setname(event.target.value)
} 

const deschandler=(event)=> {
    setdesc(event.target.value)
}

  const submithander=(event)=> {
     event.preventDefault();

     props.onaddmovie(name,desc)

  }


  return (
    <>
        <form onSubmit={submithander}>
            <label>name </label>
            <input type="text" onChange={namehandler}></input>
            <label>desc</label>
            <input type="text" onChange={deschandler}></input>
            <button type="submit">ADD</button>
        </form>
    </>
  )
}
