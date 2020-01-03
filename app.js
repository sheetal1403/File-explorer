const http = require('http');
const respond = require('./lib/respond.js');

const server = http.createServer(respond);

const port = process.env.PORT || 3000;

server.listen(port, () => {
   console.log("Listening"); 
});