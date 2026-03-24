const { Router } = require('express');
const { pool } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { str } = require('../util/validators');

const r = Router();

// Listado con filtros robustos (por tokens, acentos-insensible)
r.get('/', async (req, res) => {
  try {
    const { courseId } = req.query;
    const courseName = str(req.query.courseName);
    const profName   = str(req.query.profName);

    const params = [];
    let where = 'WHERE 1=1';

    if (courseId) { where += ' AND p.course_id=?'; params.push(Number(courseId)); }

    const addTokens = (column, value) => {
      const tokens = value.split(/\s+/).filter(Boolean);
      for (const t of tokens) {
        where += ` AND ${column} COLLATE utf8mb4_unicode_ci LIKE ?`;
        params.push(`%${t}%`);
      }
    };
    if (courseName) addTokens('c.name', courseName);
    if (profName)   addTokens('p.prof_name', profName);

    const [rows] = await pool.query(
      `SELECT p.id,p.message,p.created_at,p.prof_name,
              u.registro,u.nombres,u.apellidos,
              c.id as course_id,c.name as course_name
       FROM posts p
       LEFT JOIN users u ON u.id=p.author_id
       LEFT JOIN courses c ON c.id=p.course_id
       ${where}
       ORDER BY p.created_at DESC`,
      params
    );
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Crear publicación
r.post('/', requireAuth, async (req,res)=>{
  try{
    const message  = str(req.body.message);
    const courseId = req.body.courseId ? Number(req.body.courseId) : null;
    const profName = str(req.body.profName) || null;
    if (!message || (!courseId && !profName))
      return res.status(400).json({ error: 'Debe elegir curso o catedrático y escribir un mensaje' });

    await pool.query(
      'INSERT INTO posts (author_id,course_id,prof_name,message) VALUES (?,?,?,?)',
      [req.user.id, courseId, profName, message]
    );
    res.status(201).json({ message: 'Publicación creada' });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// Agregar comentario
r.post('/:id/comments', requireAuth, async (req,res)=>{
  try{
    const content = str(req.body.content);
    if (!content) return res.status(400).json({ error: 'Comentario vacío' });
    await pool.query(
      'INSERT INTO comments (post_id,author_id,content) VALUES (?,?,?)',
      [Number(req.params.id), req.user.id, content]
    );
    res.status(201).json({ message: 'Comentario agregado' });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

// Listar comentarios (con nombre del autor)
r.get('/:id/comments', async (req,res)=>{
  try{
    const [rows] = await pool.query(
      `SELECT c.id,c.content,c.created_at,
              u.registro,u.nombres,u.apellidos
       FROM comments c
       JOIN users u ON u.id=c.author_id
       WHERE c.post_id=?
       ORDER BY c.created_at ASC`,
      [Number(req.params.id)]
    );
    res.json(rows);
  }catch(e){ res.status(500).json({ error: e.message }); }
});

module.exports = r;
