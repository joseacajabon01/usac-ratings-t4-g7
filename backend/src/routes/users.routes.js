const { Router } = require('express');
const { pool } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { str, isEmail } = require('../util/validators');

const r = Router();

r.get('/users/:registro', async (req,res)=>{
  const [rows] = await pool.query(
    'SELECT registro,nombres,apellidos,email,created_at FROM users WHERE registro=?',
    [req.params.registro]
  );
  if (!rows.length) return res.status(404).json({ error: 'No existe' });
  res.json(rows[0]);
});

// QUIÉN SOY
r.get('/me', requireAuth, async (req,res)=>{
  const [rows] = await pool.query(
    'SELECT id,registro,nombres,apellidos,email FROM users WHERE id=?',
    [req.user.id]
  );
  res.json(rows[0]);
});

r.put('/me', requireAuth, async (req,res)=>{
  const nombres = str(req.body.nombres);
  const apellidos = str(req.body.apellidos);
  const email = str(req.body.email).toLowerCase();
  if (!nombres || !apellidos || !isEmail(email)) return res.status(400).json({ error: 'Datos inválidos' });
  await pool.query('UPDATE users SET nombres=?,apellidos=?,email=? WHERE id=?',[nombres,apellidos,email,req.user.id]);
  res.json({ message: 'Perfil actualizado' });
});

r.get('/courses', async (_req,res)=>{
  const [rows] = await pool.query('SELECT id,code,name FROM courses ORDER BY name');
  res.json(rows);
});

// Cursos de un registro (para ver perfil ajeno)
r.get('/users/:registro/courses', async (req,res)=>{
  const [rows] = await pool.query(
    `SELECT c.id,c.code,c.name FROM approved_courses ac
     JOIN users u ON u.id=ac.user_id
     JOIN courses c ON c.id=ac.course_id
     WHERE u.registro=?`, [req.params.registro]
  );
  res.json(rows);
});

// MIS cursos aprobados (para “Mis Cursos”)
r.get('/me/courses', requireAuth, async (req,res)=>{
  const [rows] = await pool.query(
    `SELECT c.id,c.code,c.name
     FROM approved_courses ac
     JOIN courses c ON c.id=ac.course_id
     WHERE ac.user_id=?`,
    [req.user.id]
  );
  res.json(rows);
});

r.post('/me/courses', requireAuth, async (req,res)=>{
  const id = Number(req.body.courseId);
  if (!id) return res.status(400).json({ error: 'courseId requerido' });
  await pool.query('INSERT IGNORE INTO approved_courses (user_id,course_id) VALUES (?,?)',[req.user.id,id]);
  res.status(201).json({ message: 'Curso agregado' });
});

module.exports = r;
