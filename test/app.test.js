'use strict'
const db = require('../database')
const request = require('supertest')

const app = require('../app')

jest.mock('../database')

afterAll(() => app.close())
describe('app', () => {
    describe('GET /name', () => {
        test('fetchAll', async () => {
            console.log("enter")
            const data = [
                {id: '1', name: 'aaa'},
                {id: '2', name: 'bbb'}
            ]
            db.fetchAll.mockResolvedValue(data)

            const res = await request(app).get('/name')
            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(data)
        })
        test('fail fetchAll', async () => {
            db.fetchAll.mockRejectedValue(new Error('failed fetchAll'))
            const res = await request(app).get('/name')
            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({ error: 'failed fetchAll'})
        })
    })
    describe('POST /name', () => {
        test('success case', async () => {
            const expectedData = {id: 1, name: 'aaa'}
            db.put.mockResolvedValue(expectedData)
            const res = await request(app)
                .post('/name')
                .send({name: 'aaa'})
            expect(res.statusCode).toBe(201)
            expect(res.body).toEqual(expectedData)
            expect(db.put).toHaveBeenCalledWith(expectedData)            
        })
        test('failure case', async () => {
            db.put.mockRejectedValue(new Error('failed put'))
            const res = await request(app)
            .post('/name')
            .send({name: 'aaa'})
            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({ error: 'failed put'})
        })
        test('name not found', async () => {
            db.put.mockResolvedValue()
            const res = await request(app)
                .post('/name')
            expect(res.statusCode).toBe(400)
            expect(res.body).toEqual({ error: 'name is required'})
        })
    })
    describe('PUT /name/1', () => {
        test('success case', async () => {
            const expectedData = { id: 1, name: 'bbb'}
            db.update.mockResolvedValue(expectedData)
            const res = await request(app)
                .put('/name/1')
                .send({name: 'bbb'})
            expect(res.statusCode).toBe(202)
            expect(res.body).toEqual(expectedData)
            expect(db.update).toHaveBeenCalledWith(expectedData)
        })
        test('failure case', async () => {
            db.update.mockRejectedValue(new Error('failed put'))
            const res = await request(app)
            .put('/name/1')
            .send({name: 'bbb'})
            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({ error: 'failed put'})
        })
        test('name not found', async () => {
            db.update.mockResolvedValue()
            const res = await request(app)
                .put('/name/1')

            expect(res.statusCode).toBe(400)
            expect(res.body).toEqual({ error: 'name is required'})
        })
    })
    describe('DELETE /name/1', () => {
        test('success case', async () => {
            db.del.mockResolvedValue(1)
            const res = await request(app)
                .delete('/name/1')
            expect(res.statusCode).toBe(204)
            expect(res.body).toEqual({})
            expect(db.del).toHaveBeenCalledWith(1)
        })
        test('failure case', async () => {
            db.del.mockRejectedValue(new Error('failed delete'))
            const res = await request(app)
                .delete('/name/1')
            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({error: 'failed delete'})
        })
    })
})