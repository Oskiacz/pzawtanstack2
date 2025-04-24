import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import axios from 'axios';


export const Route = createFileRoute('/table')({
    component: RouteComponent,
})

function RouteComponent() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/get-user', { withCredentials: true })
          .then(res => {
            if (res.data.loggedIn) {
              console.log('Logged in as:', res.data.user);
              
              axios.get('http://localhost:8000/table')
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));
    
            } else {
              console.log('Not logged in');
              navigate({ to: '/login' });
            }
          });
      }, [navigate]);

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Delete</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i) => (
                    <tr>
                        <td>{e.id}</td>
                        <td>{e.email}</td>
                        <td>{e.password}</td>
                        <td>{e.name}</td>
                        <td>{e.gender}</td>
                        <td><input type="button" value="X" className="btn btn-secondary" onClick={() => { console.log(e.id); axios.delete('http://localhost:8000/delete/' + e.id).catch((err) => console.log(err)) }} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
