import { useEffect, useState } from 'react'
import 'isomorphic-fetch'

export default function Index() {
    const [data, setData] = useState([])

    const get = () => {
        fetch(`/name`)
        .then(async res => {
            if (res.ok) {
                setData(await res.json())
            } else {
                alert(await res.text())
            }
        }) 
    }

    useEffect(() => {
        get()
    }, [])       

    return(
        <>
        <h1>Change Data</h1>
        <ul>
            {data.map(({key, value}, index) => <List key={key} value={value} index={index}/>) }
        </ul>
        </>
    )
}

function List({key, value, index}) {
    const [title, setTitle] = useState(value)

    return (
        <li key={key}> 
            <button style={{margin: 10}}>Change</button>
            id: {key} name: <input type="text" value={title} onChange={event => setTitle(event.target.value)}/> 
        </li>
    )
}