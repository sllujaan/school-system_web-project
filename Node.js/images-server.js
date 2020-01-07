const fs = require('fs')
const express = require('express')
const app = express()

app.use('/assets', express.static('assets'))

app.get('/',  (req, res) => {
    res.send("hello world")

})

app.get('/css',  (req, res) => {
    fs.readFile('assets/nav.css', (err, data) => {
        if(err) throw err
        res.end(data)
    })
})

app.get('/image',  (req, res) => {
    fs.readFile('assets/uploads/images/image.jpg', (err, data) => {
        if(err) throw err
        console.log(data)
        res.end(data)
    })
})

app.get('/photo', (req, res) => {
    fs.readFile('assets/uploads/images/photo', (err, data) => {
        if(err) throw err
        console.log(data)
        res.end(data)
    })
})

app.get('/getImage/:id',  (req, res) => {
    console.log(req.params)
    fs.readFile('assets/uploads/images/'+req.params.id, (err, data) => {
        if(err) {
            if(err.code == 'ENOENT') {
                res.send("No File Found named "+req.params.id)
            }
        }
        else{
            console.log(data)
            res.end(data)
        }
    })
})

app.get('/getText/:id',  (req, res) => {
    console.log(req.params)
    fs.readFile('assets/texts/'+req.params.id, (err, data) => {
        if(err) {
            if(err.code == 'ENOENT') {
                res.send("No File Found named "+req.params.id)
            }
        }
        else{
            console.log(data)
            res.end(data)
        }
    })
})

app.listen(3000)
console.log(`server is running at http://localhost:3000/`)