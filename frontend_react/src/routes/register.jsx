import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import axios from 'axios';
import logo from '../logo.svg'
import '../App.css'

export const Route = createFileRoute('/register')({
  component: App,
})

function App() {
  const emailRef=useRef();
    const passwordRef=useRef();
    const nameRef=useRef()
    const genderRef=useRef();

    

    return(
        <div className='container form'>
            <label htmlFor="email">email: </label><input id="email" type="text" className="form-control" ref={emailRef}/>
            <label htmlFor="password">password: </label><input id="password" type="text" className="form-control" ref={passwordRef}/>
            <label htmlFor="name">name: </label><input id="name" type="text" className="form-control" ref={nameRef}/>
            <label htmlFor="gender">gender</label><input type="checkbox" id="gender" className="form-check" ref={genderRef}/>
            <input type="button" className="btn btn-secondary"value="Submit" onClick={()=>{axios.post("http://localhost:8000/send", {email: emailRef.current.value, password: passwordRef.current.value, name: nameRef.current.value, gender: genderRef.current.checked})}}/>
        </div>
    )
}
