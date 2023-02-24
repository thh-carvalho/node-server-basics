//core module to create a server
const http = require('http')
const routes = require('./routes') 

let server = http.createServer(routes)

//The application don't exit and stay in the server
server.listen(3000)
