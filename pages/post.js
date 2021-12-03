import AddForm from "./../AddForm"
import { useEffect, useState } from 'react'
import 'isomorphic-fetch'

export default function Post() {
    const [data, setData] = useState([])
    const [response, setResponse] = useState("")

    useEffect(() => {
        fetch(`/name`)
            .then(async res => res.ok ? setData(await res.json()) : alert(await res.text()))
    }, [response])    

    return(
        <> 
           <section> 
           <h1>Post Data</h1>
           <AddForm onNewName={res => setResponse(res)} />
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
    );
}