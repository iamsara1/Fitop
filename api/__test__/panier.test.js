const app = require("../index.js");
supertest = require('supertest');
describe('panier', () => {
    describe('create panier ' , () => {
        it('should return a 200', async() =>{
        const createpanier = {
            userId: "623b6788c9c561edf5f53e20",
            products: [],
            Total: 0,
            panierQuantity: 0
          }
        const {body , statusCode} = await supertest(app).post(`/api/panier/`)
        .send(createpanier);
        expect(statusCode).toBe(200);
        })        
    })
})
describe('panier', () => {
    describe('update panier ' , () => {
        it('should return a 200', async() =>{
        const userId= '623b6788c9c561edf5f53e20'
        const createpanier = {            
            products: {
                products: [
                  {
                    "_id": "623b5244add94578cf674a69",
                    "img": "any",
                    "title": "T-shirt nike",
                    "quantite": 4,
                    "color": "white",
                    "size": "XL",
                    "price": 80
                  }                 
                ],
                Total: 80,
                panierQuantity: 1
              },
        }
        const {body , statusCode} = await supertest(app).put(`/api/panier/${userId}`)
        .send(createpanier);
        expect(statusCode).toBe(200);
        })        
    })
})
describe('panier', () => {
    describe('get panier ' , () => {
        it('should return a 200', async() =>{
        const userId= '623b6788c9c561edf5f53e20'
        const {body , statusCode} = await supertest(app).get(`/api/panier//find/${userId}`);
        expect(statusCode).toBe(200);
        })        
    })
})