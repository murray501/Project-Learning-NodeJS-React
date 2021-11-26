require('isomorphic-fetch')

async function get() {
    let result = await fetch('http://localhost:3000/name')
    console.log(result.status, await result.json())
}

async function post() {
    let result = await fetch('http://localhost:3000/name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'ddddd'})
    })
    console.log(result.status, await result.json())
}


get()
post()

