const express = require('express')
const dotenv = require('dotenv')
const { v4: uuid } = require('uuid')
const Book = require('./src/book')
const library = require('./data-libraryage/library')

// init process env
dotenv.config()

// create app (router)
const app = express()
app.use(express.json())

const authResBody = {
  id: 1,
  mail: 'test@mail.ru',
}

app.get('/api/books', (req, res) => {
    const {books} = library
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | книга не найдена')
    }

})

app.post('/api/user', (req, res) => {
  res.status(201)
  res.json(authResBody)
})

app.post('/login', (req, res) => {
  res.status(201)
  res.json(authResBody)
})

app.post('/api/books/', (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
        books[idx] = {
          ...books[idx],
          title,
          description,
          authors,
          favorite,
          fileCover,
          fileName
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | книга не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {books} = library
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | книга не найдена')
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)