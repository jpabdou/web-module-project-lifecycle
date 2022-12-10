const { setupServer } = require('msw/node')
const { rest } = require('msw')
const Todo = require('./helpers')

async function getAll(req, res, ctx) {
  const [status, payload] = await Todo.getAll(req.body)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}

async function getById(req, res, ctx) {
  const [status, payload] = await Todo.getById(req.params.id)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}

async function create(req, res, ctx) {
  const [status, payload] = await Todo.create(req.body)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}

async function toggleDone(req, res, ctx) {
  const [status, payload] = await Todo.toggleDone(req.params.id)
  return res(
    ctx.status(status),
    ctx.json(payload),
  )
}

async function remove(req, res, ctx) {
  const [status, payload] = await Todo.remove(req.params.id)
  return res(
    ctx.status(status),
    ctx.json(payload),
  );
}

function catchAll(req, res, ctx) {
  const message = `Endpoint [${req.method}] /${req.params['0']} does not exist`
  return res(
    ctx.status(404),
    ctx.json({ message }),
  )
}


const handlers = [
  rest.get('https://jpabdou.github.io/web-module-project-lifecycle/api/todos', getAll),
  rest.get('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/:id', getById),
  rest.post('https://jpabdou.github.io/web-module-project-lifecycle/api/todos', create),
  rest.patch('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/:id', toggleDone),
  rest.delete('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/:id', remove),
  rest.all('https://jpabdou.github.io/web-module-project-lifecycle/api/todos/*', catchAll),
]

module.exports = setupServer(...handlers)
