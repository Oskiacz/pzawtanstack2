import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import axios from 'axios';
import logo from '../logo.svg'
import '../App.css'

export const Route = createFileRoute('/register')({
  component: App,
})

function App() {
  const nameRef=useRef();
    const urlRef=useRef();
    const textRef=useRef()
    const sponsoredRef=useRef();

    

    return(
        <div className='container form'>
            <label htmlFor="name">name: </label><input id="name" type="text" className="form-control" ref={nameRef}/>
            <label htmlFor="url">url: </label><input id="url" type="text" className="form-control" ref={urlRef}/>
            <label htmlFor="text">text: </label><input id="text" type="text" className="form-control" ref={textRef}/>
            <label htmlFor="checkBox">sponsored</label><input type="checkbox" id="checkBox" className="form-check" ref={sponsoredRef}/>
            <input type="button" className="btn btn-secondary"value="Submit" onClick={()=>{axios.post("http://localhost:8000/send", {name: nameRef.current.value, url: urlRef.current.value, text: textRef.current.value, sponsored: sponsoredRef.current.checked})}}/>
        </div>
    )
}
