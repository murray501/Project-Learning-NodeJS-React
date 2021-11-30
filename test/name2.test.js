require('isomorphic-fetch')

xtest('get', async () => {
    let res = await fetch('http://localhost:3000/name');
    let received = await res.json();
    expect(res.status).toBe(200);
    expect(received.length).toBe(0);
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
    expect(received).toEqual({id: 1, name: 'ddddd'});

    res = await fetch('http://localhost:3000/name');
    received = await res.json(); 
    expect(res.status).toBe(200);
    expect(received).toEqual([{key: '1', value: 'ddddd'}]);
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
    expect(received).toEqual([{key: '1', value: 'zzzzz'}]);    
})

xtest('del', async () => {
    let res = await fetch('http://localhost:3000/name/1', {
        method: 'DELETE',
    })
    expect(res.status).toBe(204);
    
    res = await fetch('http://localhost:3000/name');
    received = await res.json(); 
    expect(res.status).toBe(200);
    expect(received.length).toBe(0);        
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



