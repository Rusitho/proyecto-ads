const pool = require('../config/db');

const CATALOGOS = {
  categorias: { tabla: 'categoria', id: 'categoria_id', campo: 'nombre' },
  subcategorias: { tabla: 'subcategoria', id: 'subcategoria_id', campo: 'nombre', filtro: 'categoria_id' },
  tipos_lesion: { tabla: 'tipo_lesion', id: 'tipo_lesion_id', campo: 'nombre' },
  origenes: { tabla: 'origen', id: 'origen_id', campo: 'nombre' },
  evaluacion_riesgo: { tabla: 'evaluacion_riesgo', id: 'riesgo_id', campo: 'nivel' },
  estaciones: { tabla: 'estacion', id: 'estacion_id', campo: 'nombre' },
  empresas: { tabla: 'empresa_operadora', id: 'empresa_id', campo: 'nombre' },
  vehiculos: { tabla: 'vehiculo', id: 'vehiculo_id', campo: 'placa', filtro: 'empresa_id' },
  conductores: { tabla: 'conductor', id: 'conductor_id', campo: 'nombre' },
  partes_lesion: { tabla: 'parte_lesion', id: 'parte_lesion_id', campo: 'nombre' },
  atencion_medica: { tabla: 'atencion_medica', id: 'atencion_medica_id', campo: 'tipo' },
  companias_seguro: { tabla: 'compania_seguro', id: 'compania_seguro_id', campo: 'nombre' },
  centros_medicos: { tabla: 'centro_medico', id: 'centro_medico_id', campo: 'nombre' },
  topicos: { tabla: 'topico_sala', id: 'topico_id', campo: 'nombre' },
  comisarias: { tabla: 'comisaria', id: 'comisaria_id', campo: 'nombre' },
  evaluacion_responsabilidad: { tabla: 'evaluacion_responsabilidad', id: 'evaluacion_responsabilidad_id', campo: 'resultado' },
  asesores: { tabla: 'asesor', id: 'asesor_id', campo: 'nombre' },
  tipos_documento: { tabla: 'tipo_documento', id: 'tipo_documento_id', campo: 'nombre' },
  generos: { tabla: 'genero', id: 'genero_id', campo: 'nombre' }
};

exports.getCatalogo = async (req, res) => {
  const { catalogo } = req.params;
  const config = CATALOGOS[catalogo];

  if (!config) {
    return res.status(404).json({ error: `Catálogo '${catalogo}' no encontrado` });
  }

  try {
    const [rows] = await pool.query(
      `SELECT ${config.id} as id, ${config.campo} as nombre FROM ${config.tabla} ORDER BY ${config.campo}`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogoFiltrado = async (req, res) => {
  const { catalogo, parentId } = req.params;
  const config = CATALOGOS[catalogo];

  if (!config || !config.filtro) {
    return res.status(404).json({ error: `Catálogo filtrado '${catalogo}' no disponible` });
  }

  try {
    const [rows] = await pool.query(
      `SELECT ${config.id} as id, ${config.campo} as nombre FROM ${config.tabla} WHERE ${config.filtro} = ? ORDER BY ${config.campo}`,
      [parentId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatalogosDisponibles = async (req, res) => {
  res.json(Object.keys(CATALOGOS));
};
