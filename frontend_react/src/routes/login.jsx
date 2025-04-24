import { useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className='container form'>
      <label htmlFor="email">email: </label><input id="email" type="text" className="form-control" ref={emailRef} />
      <label htmlFor="password">password: </label><input id="password" type="text" className="form-control" ref={passwordRef} />
      <input type="button" className="btn btn-secondary" value="Submit" onClick={() => {
        axios.post("http://localhost:8000/login", { email: emailRef.current.value, password: passwordRef.current.value }, { withCredentials: true })
      }} />
    </div>
  )
}
