import { createContext, useContext } from "react";
import { useEffect, useState } from 'react'
import { useInput } from "../hooks"
import { FaTrash } from "react-icons/fa"
import 'isomorphic-fetch'

const Context = createContext();

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
        <Context.Provider value={{data, onChange}}>
        <>
        <Get />
        <Post />
        <Put />
        <Delete />
        </>
        </Context.Provider>
    )
}

function Post() {
    return (
    <section> 
    <h1>Post Data</h1>
    <AddForm />
    </section>
    )
}

function AddForm() {
    const {data, onChange} = useContext(Context);
    const [Props, reset] = useInput("");

    const submit = e => {
        e.preventDefault();
        fetch('/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: Props.value})
        })
        .then(async res => res.ok ? onChange() : alert(await res.text()))
        reset("")
    };

    return(
        <form onSubmit={submit}>
            <input 
                {...Props}
                type="text" 
                placeholder="enter name..." 
                required 
            />
            <button>ADD</button> 
        </form>
    );
}

function Get() {
    const {data, onChange} = useContext(Context);
    return (
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
    )    
}

function Put() {
    const {data, onChange} = useContext(Context);
    return (
    <section>
    <h1>Change Data</h1>
    <ul>
        {data.map(dat => <List dat={dat} />) }
    </ul>
    </section>
    )
}

function Delete() {
    const {data, onChange} = useContext(Context);
    const remove = id => {
        let str = '/name/' + id
        fetch(str, {
            method: 'DELETE',
        })
        .then(async res => res.ok ? onChange() : alert(await res.text()))
    }

    return (
        <section>
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
        </section>
    )
}

function List({dat}) {
    const {data, onChange} = useContext(Context);
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