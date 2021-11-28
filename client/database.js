'use strict'
require('isomorphic-fetch')

const db = require('./../database');

(async () => {
    await db.put({id: 1,name: 'hello'})
    await db.put({id: 2, name: 'world'})
    await db.put({id: 3, name: 'evening'})
    await db.update({id: 4, name: 'good'})
    let result = await db.fetchAll();
    console.log(result)
    
    await db.removeAll()
    let result2 = await db.fetchAll();
    console.log(`result2 = ${result2.length}`);
})();

console.log("done")
