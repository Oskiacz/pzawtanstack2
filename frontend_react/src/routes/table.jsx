import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import axios from 'axios';

export const Route = createFileRoute('/table')({
    component: RouteComponent,
})

function RouteComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/table')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [])

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Url</th>
                    <th>Text</th>
                    <th>Delete</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i) => (
                    <tr>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.url}</td>
                        <td>{e.text}</td>
                        <td><input type="button" value="X" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
