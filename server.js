const express = require('express')
const fs = require('fs')
const port = 3000;

const server = express();
server.use(express.static('public'))

server.get('/notes', )

server.listen(port, () => {
    console.log('Server started')
})



