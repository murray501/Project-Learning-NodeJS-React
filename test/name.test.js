require('isomorphic-fetch')

let data

beforeEach(() => {
    data = require('../data/name')
})

xtest('get', async () => {
    const res = await fetch('http://localhost:3000/name');
    const received = await res.json(); 
    expect(res.status).toBe(200);
    expect(received).toEqual(data);
})

xtest('post', async () => {
    let res = await fetch('http://localhost:3000/name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'ddddd'})
    })
    let received = await res.json();
    expect(res.status).toBe(201);
    expect(received).toEqual('ddddd');

    res = await fetch('http://localhost:3000/name');
    received = await res.json(); 
    expect(res.status).toBe(200);
    data.push({id: 4, name: 'ddddd'})
    let content1 = received.map(({id, x}) => x);
    let content2 = data.map(({id, x}) => x);

    expect(content1).toEqual(content2);
})

xtest('put', async () => {
    let res = await fetch('http://localhost:3000/name/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'zzzzz'})
    })
    let received = await res.json();
    expect(res.status).toBe(202);
    expect(received.name).toBe('zzzzz');
    
    res = await fetch('http://localhost:3000/name');
    received = await res.json(); 
    expect(res.status).toBe(200);
    let content1 = received.map(x => x.name);
    let content2 = ['zzzzz','bbbbb','ccccc','ddddd']
    expect(content1).toEqual(content2);    
})

xtest('del', async () => {
    let res = await fetch('http://localhost:3000/name/2', {
        method: 'DELETE',
    })
    expect(res.status).toBe(204);
    
    res = await fetch('http://localhost:3000/name');
    received = await res.json(); 
    expect(res.status).toBe(200);
    let content1 = received.map(x => x.name);
    let content2 = ['zzzzz','ccccc','ddddd']
    expect(content1).toEqual(content2);
        
})

xtest('fail post', async () => {
    let res = await fetch('http://localhost:3000/name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    let received = await res.json();
    expect(res.status).toBe(400);
    expect(received).toEqual({error: 'name is required'});
})

xtest('fail put', async () => {
    let res = await fetch('http://localhost:3000/name/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    let received = await res.json();
    expect(res.status).toBe(400);
    expect(received).toEqual({error: 'name is required'});
})



