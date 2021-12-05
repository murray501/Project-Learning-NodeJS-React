import { useEffect, useState } from 'react'
import { useInput } from "../hooks"
import 'isomorphic-fetch'

export default function Index() {
    const [data, setData] = useState([])
    const [change, setChange] = useState(false)

    const onChange = () => {
        setChange(!change)
    }

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
    }, [change])       

    return(
        <>
        <section>
        <h1>Change Data</h1>
        <ul>
            {data.map(dat => <List dat={dat} onChange={onChange}/>) }
        </ul>
        </section>
        <section>
        <h1>Get All Data</h1>
        <ul>
            {data.map(({key, value}) => 
                <li key={key}> 
                    id: {key} name: {value}
                </li>
            )}
        </ul>
        </section>
        </>
    )
}

function List({dat, onChange = f => f}) {
    const key = dat.key
    const value = dat.value
    const [Props, reset] = useInput(value)

    const put = () => {
        fetch('/name/' + key, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: Props.value})
        })
        .then(async res => {
            if (res.ok) {
                onChange()
            } else {
                alert(await res.text())
            }
        }) 
    }

    const submit = e => {
        e.preventDefault();
        put();
    }

    return (
        <li key={key}> 
            <form onSubmit={submit}>
            <button style={{margin: 10}}>Change</button>
            id: {key} name: <input {...Props} type="text" required/>
            </form> 
        </li>
    )
}