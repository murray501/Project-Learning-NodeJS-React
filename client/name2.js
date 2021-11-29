require('isomorphic-fetch')

async function get() {
    let result = await fetch('http://localhost:3000/name')
    console.log(result.status, await result.json())
}

async function post(name) {
    let result = await fetch('http://localhost:3000/name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    })
    console.log(result.status, await result.json())
}

async function put() {
    let result = await fetch('http://localhost:3000/name/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'zzzz'})
    })
    console.log(result.status, await result.json())
}

async function del() {
    let result = await fetch('http://localhost:3000/name/2', {
        method: 'DELETE',
    })
    console.log(result.status)
}

(async () => {
    await post('cccc');
    await post('dddd');
    await put();
    await del();
    await get();
})();



