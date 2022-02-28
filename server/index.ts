import * as process from 'process'
import express from "express"

import User from '../src/data/User'
import Todo from '../src/data/Todo'
import cors from 'cors'
import { generateUsers, generateTodos } from './mixtures'

process.env.PORT = "3002"

const app = express()

const users: { [key: string]: User } = { }
const todos: { [key: string]: Todo } = { }
const friendMap: { [key: string]: string[] } = { }

for (const user of generateUsers())
    users[user.id] = user;

for (const todo of generateTodos())
    todos[todo.id] = todo;

app.use(cors())
app.use("/", express.static(__dirname + "/.."))
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log('The server listens on port', process.env.PORT);
    console.log('Local url: ', `http://localhost:${process.env.PORT}`);
})

app.get('/api/users', (req, res) => {
    res.send([...Object.values(users)])
})

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = users[id]
    if (user)
        return res.send(user)
    res.status(404).send({ message: "L'utilisateur l'éxiste pas" })
})

app.post('/api/users', (req, res) => {
    console.log(req.body);
    const user = req.body
    if (user) {
        users[user.id] = user
        return res.send(user)
    }
    res.status(400).send({ message: "L'utilisateur fourni est incorrect" })
})

app.put('/api/users/:id', (req, res) => {
    const data = req.body
    const id = req.params.id
    const user = users[id]
    if (user) {
        Object.assign(user, data)
        return res.send(user)
    }
    res.status(404).send({ message: "L'utilisateur l'éxiste pas" })
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    if (users[id]) {
        delete users[id]
        return res.send({ id })
    }
    res.status(404).send({ message: "L'utilisateur l'éxiste pas" })
})

app.get('/api/todos', (req, res) => {
    res.send([...Object.values(todos)])
})

app.put('/api/todos/:id', (req, res) => {
    const finished = req.body.finished
    const id = req.params.id

    if (finished === undefined) 
        return res.status(400).send({ message: "La requête est incomplète" })

    if (todos[id]) {
        todos[id].finished = finished
        return res.send(todos[id])
    }

    res.status(404).send({ message: "La tâche n'éxiste pas" })
})