const express = require('express')
const fs = require('fs')
const path = require('path')
const port = 3000;
// const api = require('./routes/api.js')

const server = express();
server.use(express.static(path.join(__dirname, 'public'), {extensions:['html']}))
// server.use('/api', api)
server.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
})



server.listen(port, () => {
    console.log('Server started')
})



