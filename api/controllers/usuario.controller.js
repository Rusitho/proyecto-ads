const pool = require('../config/db');

exports.buscarPorDocumento = async (req, res) => {
  const { numero } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT u.*, td.nombre as tipo_doc_nombre, g.nombre as genero_nombre
       FROM usuario u
       LEFT JOIN tipo_documento td ON u.tipo_documento_id = td.tipo_documento_id
       LEFT JOIN genero g ON u.genero_id = g.genero_id
       WHERE u.numero_documento = ?`,
      [numero]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crear = async (req, res) => {
  const { tipo_documento_id, numero_documento, nombres, apellidos, genero_id, telefono, correo } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuario (tipo_documento_id, numero_documento, nombres, apellidos, genero_id, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tipo_documento_id, numero_documento, nombres, apellidos, genero_id, telefono, correo]
    );
    res.status(201).json({ mensaje: 'Usuario registrado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.vincularIncidente = async (req, res) => {
  const { incidente_id, usuario_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO incidente_usuario (incidente_id, usuario_id) VALUES (?, ?)',
      [incidente_id, usuario_id]
    );
    res.status(201).json({ mensaje: 'Usuario vinculado al incidente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
