const STORAGE_KEY = 'incidentes_registrados';

export function guardarIncidenteLocal(data) {
  const registros = obtenerIncidentesLocales();
  const nuevo = {
    ...data,
    incidente_id: registros.length + 1,
    fecha_registro: new Date().toISOString(),
    estado: data.estado || 'Registrado'
  };
  registros.unshift(nuevo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
  return nuevo;
}

export function obtenerIncidentesLocales() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
