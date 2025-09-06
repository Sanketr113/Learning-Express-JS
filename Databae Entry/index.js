require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Create pool connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'blogdb'
});

// GET all posts
app.get('/posts', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM posts');
  res.json(rows);
});

// GET single post
app.get('/posts/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// CREATE post
app.post('/posts', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Title and body required' });
  const [result] = await pool.query('INSERT INTO posts (title, body) VALUES (?, ?)', [title, body]);
  res.status(201).json({ id: result.insertId, title, body });
});

// UPDATE post
app.put('/posts/:id', async (req, res) => {
  const { title, body } = req.body;
  const [result] = await pool.query('UPDATE posts SET title=?, body=? WHERE id=?', [title, body, req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ id: req.params.id, title, body });
});

// DELETE post
app.delete('/posts/:id', async (req, res) => {
  const [result] = await pool.query('DELETE FROM posts WHERE id=?', [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Blog API running on port 3000'));
