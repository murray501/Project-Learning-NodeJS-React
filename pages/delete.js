import { useEffect, useState } from 'react'
import 'isomorphic-fetch'
import { FaTrash } from "react-icons/fa"

export default function Delete() {
    const [toggle, setToggle] = useState(false)

    const remove = id => {
        let str = '/name/' + id
        fetch(str, {
            method: 'DELETE',
        })
        .then(async res => res.ok ? setToggle(!toggle) : alert(await res.text()))
    }

    const [data, setData] = useState([])
    

    const get = () => {
        fetch(`/name`)
        .then(async res => res.ok ? setData(await res.json()) : alert(await res.text())) 
    }

    useEffect(() => {
        get()
    }, [toggle])       

    return(
        <>
        <h1>Delete Data</h1>
        <ul>
            {data.map(({key, value}) => 
                <li key={key}> 
                    <button style={{margin: 10}} onClick = {() => remove(key)}>
                    <FaTrash />
                    </button>
                    id: {key} name: {value} 
                </li>
            )}
        </ul>
        </>
    )
}