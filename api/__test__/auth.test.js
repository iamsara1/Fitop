const app = require("../index.js");
supertest = require('supertest');
describe('Authentication', () => {
    describe('register with email and username already used' , () => {
        it('should return a 500', async() =>{
        const register = {
            username: "lamiae",
            email: "lamaie@gmail.com",
            name: "lamiae",
            lastname: "lamiae",
            password: "imane"
        }
        const {body , statusCode} = await supertest(app).post(`/api/auth/inscrire`)
        .send(register);
        expect(statusCode).toBe(500);
        })        
    })
})
describe('Authentication', () => {
    describe('Register' , () => {
        it('should return a 201', async() =>{
        const register = {
            username: "jisara",
            email: "saarasaad27@gmail.com",
            name: "sara",
            lastname: "saad",
            password: "sara"
        }
        const {body , statusCode} = await supertest(app).post(`/api/auth/inscrire`)
        .send(register);
        expect(statusCode).toBe(500);
        })        
    })
})
describe('Authentication', () => {
    describe('Login' , () => {
        it('should return a 200 and user', async() =>{
        const login = {
            email: "lamiae@gmail.com",
            password: "lamiae"
        }
        const {body , statusCode} = await supertest(app).post(`/api/auth/login`)
        .send(login);
        expect(statusCode).toBe(200);
        expect(body.email).toBe(login.email);
        })        
    })
})
describe('Authentication', () => {
    describe('Login with a wrong passwprd' , () => {
        it('should return a 401', async() =>{
        const login = {
            email: "lamiae@gmail.com",
            password: "lamiae1"
        }
        const {body , statusCode} = await supertest(app).post(`/api/auth/login`)
        .send(login);
        expect(statusCode).toBe(401);
        })        
    })
})
describe('Authentication', () => {
    describe('Login with a wrong mail' , () => {
        it('should return a 401', async() =>{
        const login = {
            email: "error@gmail.com",
            password: "lamiae1"
        }
        const {body , statusCode} = await supertest(app).post(`/api/auth/login`)
        .send(login);
        expect(statusCode).toBe(401);
        })        
    })
})