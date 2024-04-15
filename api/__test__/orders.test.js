const app = require("../index.js");
supertest = require('supertest');
describe('orders', () => {
    describe('create order ' , () => {
        it('should return a 200', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2I2Nzg4YzljNTYxZWRmNWY1M2UyMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDgwNjA0MDcsImV4cCI6MTY0ODMxOTYwN30.JxffluKchgwpQhCJdeAxHuremuUfg81-StTjm-P221A'
        const createorder = {
            userId: "623b6788c9c561edf5f53e20",
            products: [
              {
                productId: "623b5244add94578cf674a69",
                quantity: 5
              }
            ],
            amount: 100,
            address: "any",
            status: "any"
          }
        const {body , statusCode} = await supertest(app).post(`/api/orders/`)
        .set('token',`Bearer ${tokenJWT}`)
        .send(createorder);
        expect(statusCode).toBe(200);
        })        
    })
})
describe('orders', () => {
    describe('create a user order by another user' , () => {
        it('should return a 403', async() =>{
        const tokenJWT= 'randomToken'
        const createorder = {
            userId: "623b6788c9c561edf5f53e20",
            products: [
              {
                productId: "623b5244add94578cf674a69",
                quantity: 5
              }
            ],
            amount: 100,
            address: "any",
            status: "any"
          }
        const {body , statusCode} = await supertest(app).post(`/api/orders/`)
        .set('token',`Bearer ${tokenJWT}`)
        .send(createorder);
        expect(statusCode).toBe(403);
        })        
    })
})
describe('orders', () => {
    describe('update order by admin' , () => {
        it('should return a 200', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmJhZWU1NjhmYjIwMGRkNTA1ZGE0OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODA1MTczOCwiZXhwIjoxNjQ4MzEwOTM4fQ.twIsIpH9lX5EX0cU5R8rlVUMAY2wffYcGUkvNWVrSj8'
        const orderID='623b8b2b44b3b32991abd0cd'
        const updateorder = {
            userId: "623b6788c9c561edf5f53e20",
            products: [
              {
                productId: "623b5244add94578cf674a69",
                quantity: 5
              }
            ],
            amount: 100,
            address: "any",
            status: "any"
          }
        const {body , statusCode} = await supertest(app).put(`/api/orders/${orderID}`)
        .set('token',`Bearer ${tokenJWT}`)
        .send(updateorder);
        expect(statusCode).toBe(200);
        })        
    })
})
describe('orders', () => {
    describe('update order by user' , () => {
        it('should return a 403', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2I2Nzg4YzljNTYxZWRmNWY1M2UyMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDgwNjA0MDcsImV4cCI6MTY0ODMxOTYwN30.JxffluKchgwpQhCJdeAxHuremuUfg81-StTjm-P221A'
        const orderID='623b8b2b44b3b32991abd0cd'
        const updateorder = {
            userId: "623b6788c9c561edf5f53e20",
            products: [
              {
                productId: "623b5244add94578cf674a69",
                quantity: 5
              }
            ],
            amount: 100,
            address: "any",
            status: "valid"
          }
        const {body , statusCode} = await supertest(app).put(`/api/orders/${orderID}`)
        .set('token',`Bearer ${tokenJWT}`)
        .send(updateorder);
        expect(statusCode).toBe(403);
        })        
    })
})
describe('orders', () => {
    describe('delete order by admin' , () => {
        it('should return a 201', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmJhZWU1NjhmYjIwMGRkNTA1ZGE0OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODA1MTczOCwiZXhwIjoxNjQ4MzEwOTM4fQ.twIsIpH9lX5EX0cU5R8rlVUMAY2wffYcGUkvNWVrSj8'
        const orderID='623b8b2b44b3b32991abd0cd'        
        const {body , statusCode} = await supertest(app).delete(`/api/orders/${orderID}`)
        .set('token',`Bearer ${tokenJWT}`);
        expect(statusCode).toBe(200);
        })        
    })
})
describe('orders', () => {
    describe('delete order by a random user' , () => {
        it('should return a 403', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2I2Nzg4YzljNTYxZWRmNWY1M2UyMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDgwNjA0MDcsImV4cCI6MTY0ODMxOTYwN30.JxffluKchgwpQhCJdeAxHuremuUfg81-StTjm-P221A'
        const orderID='623b6788c9c561edf5f53e20'        
        const {body , statusCode} = await supertest(app).delete(`/api/orders/${orderID}`)
        .set('token',`Bearer ${tokenJWT}`);
        expect(statusCode).toBe(403);
        })        
    })
})
describe('orders', () => {
    describe('get order by admin ' , () => {
        it('should return a 200', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmJhZWU1NjhmYjIwMGRkNTA1ZGE0OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODA1MTczOCwiZXhwIjoxNjQ4MzEwOTM4fQ.twIsIpH9lX5EX0cU5R8rlVUMAY2wffYcGUkvNWVrSj8'
        const userID='6239e0cd81687d75c6ef3eaf'        
        const {body , statusCode} = await supertest(app).get(`/api/orders/find/${userID}`)
        .set('token',`Bearer ${tokenJWT}`);
        expect(statusCode).toBe(200);
        })        
    })
})
describe('orders', () => {
    describe('get order by random user ' , () => {
        it('should return a 403', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2I2Nzg4YzljNTYxZWRmNWY1M2UyMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDgwNjA0MDcsImV4cCI6MTY0ODMxOTYwN30.JxffluKchgwpQhCJdeAxHuremuUfg81-StTjm-P221A'
        const userID='6239e0cd81687d75c6ef3eaf'        
        const {body , statusCode} = await supertest(app).get(`/api/orders/find/${userID}`)
        .set('token',`Bearer ${tokenJWT}`);
        expect(statusCode).toBe(403);
        })        
    })
})
describe('orders', () => {
    describe('get All orders' , () => {
        it('should return a 200', async() =>{
        const tokenJWT= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmJhZWU1NjhmYjIwMGRkNTA1ZGE0OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODA1MTczOCwiZXhwIjoxNjQ4MzEwOTM4fQ.twIsIpH9lX5EX0cU5R8rlVUMAY2wffYcGUkvNWVrSj8'
        const {body , statusCode} = await supertest(app).get(`/api/orders/`)
        .set('token',`Bearer ${tokenJWT}`);
        expect(statusCode).toBe(200);
        })        
    })
})