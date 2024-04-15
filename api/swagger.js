const swaggerAutogen = require('swagger-autogen')()

const outputFile = './test.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})