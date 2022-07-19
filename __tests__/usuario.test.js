const request = require('supertest')
const app = require('../app')


describe('GET /usuarios', () =>{
    test("It should respond with the array of usuarios", async () => {
        const response = await request(app).get("/api/usuarios")
        console.log("response",response)
        expect(response.statusCode).toBe(200);
    })
}) 