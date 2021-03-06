'use strict'
require('isomorphic-fetch')

//const db = require('./../database');
/*
beforeEach(async () => {
    await db.removeAll();
})
*/

xtest('fetchAll', async () => {
   await db.put({id: 1,name: 'hello'})
    await db.put({id: 2, name: 'world'})
    let recieved = await db.fetchAll();
    let expected = [{key: '1', value: 'hello'}, {key: '2', value: 'world'}];
    return expect(recieved).toEqual(expected);
})

xtest('update', async () => {
    await db.put({id: 1,name: 'hello'})
    await db.put({id: 2, name: 'world'})
    await db.update({id: 1, name: 'howdy'})
    let recieved = await db.fetchAll();
    let expected = [{key: '1', value: 'howdy'}, {key: '2', value: 'world'}];
    return expect(recieved).toEqual(expected);
})

xtest('del', async () => {
    await db.put({id: 1,name: 'hello'})
    await db.put({id: 2, name: 'world'})
    await db.put({id: 3, name: 'howdy'})
    await db.del(2);
    let recieved = await db.fetchAll();
    let expected = [{key: '1', value: 'hello'}, {key: '3', value: 'howdy'}];
    return expect(recieved).toEqual(expected);
})

xtest('get', async () => {
    try {
        await db.get(1)
    } catch (err) {
        return expect(err).toBeTruthy();
    }
})


