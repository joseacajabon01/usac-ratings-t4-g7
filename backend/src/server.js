require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db');

const authRoutes = require('./routes/auth.routes');
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api', usersRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API escuchando en :${port}`));
