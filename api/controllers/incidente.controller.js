const pool = require('../config/db');

exports.crear = async (req, res) => {
  const {
    categoria_id, subcategoria_id, tipo_lesion_id, origen_id, riesgo_id,
    estacion_id, vehiculo_id, conductor_id, empresa_id,
    parte_lesion_id, soat_numero, soat_vigencia,
    atencion_medica_id, compania_seguro_id, centro_medico_id, topico_id, comisaria_id,
    evaluacion_responsabilidad_id, asesor_id,
    fecha_evento, descripcion, estado
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let soat_id = null;
    if (soat_numero) {
      const [soatResult] = await conn.query(
        'INSERT INTO soat (numero, vigencia) VALUES (?, ?)',
        [soat_numero, soat_vigencia || null]
      );
      soat_id = soatResult.insertId;
    }

    const [result] = await conn.query(
      `INSERT INTO incidente (
        categoria_id, subcategoria_id, tipo_lesion_id, origen_id, riesgo_id,
        estacion_id, vehiculo_id, conductor_id, empresa_id,
        parte_lesion_id, soat_id,
        atencion_medica_id, compania_seguro_id, centro_medico_id, topico_id, comisaria_id,
        evaluacion_responsabilidad_id, asesor_id,
        fecha_evento, descripcion, estado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        categoria_id, subcategoria_id, tipo_lesion_id, origen_id, riesgo_id,
        estacion_id, vehiculo_id, conductor_id, empresa_id,
        parte_lesion_id, soat_id,
        atencion_medica_id, compania_seguro_id, centro_medico_id, topico_id, comisaria_id,
        evaluacion_responsabilidad_id, asesor_id,
        fecha_evento, descripcion, estado || 'Registrado'
      ]
    );

    await conn.commit();
    res.status(201).json({ mensaje: 'Incidente registrado', id: result.insertId });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
};

exports.listar = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT i.incidente_id, i.fecha_evento, i.estado, i.descripcion,
              c.nombre as categoria, sc.nombre as subcategoria,
              e.nombre as estacion, er.nivel as riesgo
       FROM incidente i
       LEFT JOIN categoria c ON i.categoria_id = c.categoria_id
       LEFT JOIN subcategoria sc ON i.subcategoria_id = sc.subcategoria_id
       LEFT JOIN estacion e ON i.estacion_id = e.estacion_id
       LEFT JOIN evaluacion_riesgo er ON i.riesgo_id = er.riesgo_id
       ORDER BY i.fecha_registro DESC
       LIMIT 50`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
