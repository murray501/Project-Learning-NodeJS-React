'use strict'
const level = require('level')
const { join } = require('path')
const db = level(join(__dirname, 'leveldb'))

exports.get = (id) => {
    return db.get(id)
}

exports.put = ({id, name}) => {
    return db.put(id, name)
}

exports.fetchAll = async () => {
    const result = []
    for await (const v of db.createReadStream()) {
        result.push(v)
    } 
    return result
}

exports.removeAll = async () => {
    const promises = []
    for await (const v of db.createReadStream()) {
        promises.push(db.del(v.key))
    }
    return Promise.all(promises)
}

exports.update = ({id, name}) => {
    return db.batch()
      .del(id)
      .put(id, name)
      .write()
}

exports.del = (id) => {
    return db.del(id)
}
