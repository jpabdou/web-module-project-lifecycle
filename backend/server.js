const express = require('express')
const cors = require('cors')
const path = require('path')
const Todo = require('./helpers')

const server = express()

server.use(express.json())

server.use(express.static(path.join(__dirname, '../dist')))

server.use(cors())

server.get('https://jpabdou.github.io/web-module-project-lifecycle/api/todos', async (req, res) => {
  const [status, response] = await Todo.getAll()
  res.status(status).json(response)
})

server.get('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/:id', async (req, res) => {
  const [status, response] = await Todo.getById(req.params.id)
  res.status(status).json(response)
})

server.post('https://jpabdou.github.io/web-module-project-lifecycle/api/todos', async (req, res) => {
  const [status, response] = await Todo.create(req.body)
  res.status(status).json(response)
})

server.patch('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/:id', async (req, res) => {
  const [status, response] = await Todo.toggleDone(req.params.id)
  res.status(status).json(response)
})

server.delete('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/:id', async (req, res) => {
  const [status, response] = await Todo.remove(req.params.id)
  res.status(status).json(response)
})

server.use('/api/*', (req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.originalUrl} does not exist`,
  })
})

module.exports = server
