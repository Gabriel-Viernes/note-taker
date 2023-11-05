const express = require('express')
const fs = require('fs')
const path = require('path')
const port = 3000;

const server = express();
server.use(express.static(path.join(__dirname, 'public'), {extensions:['html']}))

server.listen(port, () => {
    console.log('Server started')
})



