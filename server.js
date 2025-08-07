const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/posts'
});

app.get('/api/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, title, content, date FROM posts ORDER BY date');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Unable to read posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, content, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, date) VALUES ($1, $2, $3) RETURNING id, title, content, date',
      [title, content, date || new Date().toISOString().split('T')[0]]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Unable to save post' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
