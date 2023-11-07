const express = require('express')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 5001;
const {v4: uuidv4} = require('uuid')

const server = express();
// middleware
server.use(express.static(path.join(__dirname, 'public'), {extensions:['html']}))
server.use(express.json())
server.use(express.urlencoded({ extended: true}))
// get route for /api/notes
server.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
})
// post route for /api/notes
server.post('/api/notes', (req, res) => {
    // reads the files
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            // assigns read json data to a variable then pushes data from req.body
            let tempDb = JSON.parse(data)
            let {title, text} = req.body
            let newNote = {
                title,
                text,
                id: uuidv4()
            }
            tempDb.push(newNote)
            // rewrites the db.json now with data from post req
            fs.writeFile('./db/db.json', JSON.stringify(tempDb, null, 4), (err) => {
                if(err) {
                    console.error(err)
                } else {
                    console.log('Note successfully written')
                    res.send(newNote)
                }
            })
        }
    })
})

// delete route for /api/notes/:id
server.delete('/api/notes/:id', (req, res) => {
    // reads file, then checks each entry for a matching id, then deletes the appropriate entry
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            let tempDb = JSON.parse(data)
            for (let i = 0; i < tempDb.length; i++) {
                if(tempDb[i].id === req.params.id) {
                    tempDb.splice(i, 1)
                    break;
                }
            }
            // rewrites the file now minus the deleted entry
            fs.writeFile('./db/db.json', JSON.stringify(tempDb, null, 4), (err) => {
                if(err) {
                    console.error(err)
                } else {
                    console.log('Note successfully deleted')
                    res.send('Note successfully deleted')
                }
            })
        }
    })
})




server.listen(port, () => {
    console.log('Server started')
})



