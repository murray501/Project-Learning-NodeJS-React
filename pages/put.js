import { useEffect, useState } from 'react'
import 'isomorphic-fetch'

export default function Index() {
    const [data, setData] = useState([])
    const [checks, setChecks] = useState([])

    const get = () => {
        fetch(`/name`)
        .then(async res => {
            if (res.ok) {
                setData(await res.json())
                setChecks(CreateArray(data.length).map(x => false))
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
            {data.map(({key, value}) => 
                <li key={key}> 
                    <input type="checkbox" checked={false} />
                    <span>id: {key} name: {value}</span>
                </li>
            )}
        </ul>
        </>
    )
}