import { useEffect, useState } from 'react'
import 'isomorphic-fetch'

export default function Index() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`/name`)
            .then(async res => res.ok ? setData(await res.json()) : alert(await res.text()))
    }, [])       

    return(
        <>
        <h1>Get All Data</h1>
        <ul>
            {data.map(({key, value}) => 
                <li key={key}> 
                    id: {key} name: {value}
                </li>
            )}
        </ul>
        </>
    )
}