const express = require('express')
const app = express()
app.use(express.json())

let todos = []

app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) return res.send(400).json({ error: 'Title reqired' });

    const todo = { id: Date.now(), title, done: false }
    todos.push(todo);
    res.send(201).json(todo);
})
    
app.get('/todos', (req, res) => {
    res.json(todos);
})

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) return res.send(400).json({ error: 'todo not found' });
    res.json(todo);
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.json({ message : 'todo deleted'});
})

app.listen(3000);