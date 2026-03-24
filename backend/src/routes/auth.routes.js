const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const { str, isEmail } = require('../util/validators');

const r = Router();

r.post('/register', async (req, res) => {
  try {
    const registro = str(req.body.registro);
    const nombres  = str(req.body.nombres);
    const apellidos= str(req.body.apellidos);
    const email    = str(req.body.email).toLowerCase();
    const password = str(req.body.password);

    if (!registro || !nombres || !apellidos || !isEmail(email) || password.length < 6)
      return res.status(400).json({ error: 'Datos inválidos' });

    const [exists] = await pool.query('SELECT id FROM users WHERE registro=? OR email=?',[registro,email]);
    if (exists.length) return res.status(409).json({ error: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (registro,nombres,apellidos,email,password_hash) VALUES (?,?,?,?,?)',
      [registro,nombres,apellidos,email,hash]
    );
    res.status(201).json({ message: 'Registrado' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

r.post('/login', async (req, res) => {
  try {
    const registro = str(req.body.registro);
    const password = str(req.body.password);

    const [rows] = await pool.query('SELECT id,registro,password_hash FROM users WHERE registro=?',[registro]);
    if (!rows.length) return res.status(401).json({ error: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: rows[0].id, registro: rows[0].registro }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

r.post('/reset', async (req, res) => {
  try {
    const registro = str(req.body.registro);
    const email    = str(req.body.email).toLowerCase();
    const newPass  = str(req.body.newPassword);

    const [rows] = await pool.query('SELECT id FROM users WHERE registro=? AND email=?',[registro,email]);
    if (!rows.length) return res.status(400).json({ error: 'Datos incorrectos' });
    const hash = await bcrypt.hash(newPass, 10);
    await pool.query('UPDATE users SET password_hash=? WHERE id=?',[hash, rows[0].id]);
    res.json({ message: 'Contraseña actualizada' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = r;
