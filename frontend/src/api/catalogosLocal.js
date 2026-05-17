const CATALOGOS = {
  categorias: [
    { id: 1, nombre: 'Accidente de tránsito' },
    { id: 2, nombre: 'Incidente operacional' },
    { id: 3, nombre: 'Agresión / Seguridad ciudadana' },
    { id: 4, nombre: 'Falla mecánica' },
    { id: 5, nombre: 'Caída de pasajero' },
    { id: 6, nombre: 'Emergencia médica' },
    { id: 7, nombre: 'Daño a infraestructura' },
    { id: 8, nombre: 'Incendio / Amago' },
    { id: 9, nombre: 'Robo / Hurto' },
    { id: 10, nombre: 'Otros' }
  ],
  subcategorias: {
    1: [
      { id: 1, nombre: 'Choque por alcance' },
      { id: 2, nombre: 'Choque lateral' },
      { id: 3, nombre: 'Choque frontal' },
      { id: 4, nombre: 'Volcadura' },
      { id: 5, nombre: 'Atropello' },
      { id: 6, nombre: 'Choque contra objeto fijo' }
    ],
    2: [
      { id: 7, nombre: 'Apertura de puertas en movimiento' },
      { id: 8, nombre: 'Cierre de puertas con pasajero' },
      { id: 9, nombre: 'Arranque brusco' },
      { id: 10, nombre: 'Frenada brusca' },
      { id: 11, nombre: 'Desvío de ruta' },
      { id: 12, nombre: 'Exceso de velocidad' }
    ],
    3: [
      { id: 13, nombre: 'Agresión física entre pasajeros' },
      { id: 14, nombre: 'Agresión a conductor' },
      { id: 15, nombre: 'Agresión a orientador' },
      { id: 16, nombre: 'Acoso sexual' },
      { id: 17, nombre: 'Vandalismo' }
    ],
    4: [
      { id: 18, nombre: 'Falla de frenos' },
      { id: 19, nombre: 'Falla de dirección' },
      { id: 20, nombre: 'Falla eléctrica' },
      { id: 21, nombre: 'Falla de puertas' },
      { id: 22, nombre: 'Fuga de combustible' }
    ],
    5: [
      { id: 23, nombre: 'Caída al interior del bus' },
      { id: 24, nombre: 'Caída al subir' },
      { id: 25, nombre: 'Caída al bajar' },
      { id: 26, nombre: 'Caída en estación' }
    ],
    6: [
      { id: 27, nombre: 'Desmayo' },
      { id: 28, nombre: 'Crisis convulsiva' },
      { id: 29, nombre: 'Paro cardíaco' },
      { id: 30, nombre: 'Trabajo de parto' },
      { id: 31, nombre: 'Crisis de ansiedad' }
    ],
    7: [
      { id: 32, nombre: 'Daño a estación' },
      { id: 33, nombre: 'Daño a señalización' },
      { id: 34, nombre: 'Daño a torniquete' },
      { id: 35, nombre: 'Daño a puerta de estación' }
    ],
    8: [
      { id: 36, nombre: 'Amago en motor' },
      { id: 37, nombre: 'Incendio en bus' },
      { id: 38, nombre: 'Incendio en estación' }
    ],
    9: [
      { id: 39, nombre: 'Robo a pasajero en bus' },
      { id: 40, nombre: 'Robo a pasajero en estación' },
      { id: 41, nombre: 'Hurto de componentes del bus' }
    ],
    10: [
      { id: 42, nombre: 'Objeto abandonado' },
      { id: 43, nombre: 'Derrame de sustancia' },
      { id: 44, nombre: 'Otro no clasificado' }
    ]
  },
  tipos_lesion: [
    { id: 1, nombre: 'Contusión' },
    { id: 2, nombre: 'Fractura' },
    { id: 3, nombre: 'Herida cortante' },
    { id: 4, nombre: 'Herida contusa' },
    { id: 5, nombre: 'Esguince' },
    { id: 6, nombre: 'Luxación' },
    { id: 7, nombre: 'Quemadura' },
    { id: 8, nombre: 'Traumatismo craneoencefálico' },
    { id: 9, nombre: 'Politraumatismo' },
    { id: 10, nombre: 'Abrasión / Raspadura' },
    { id: 11, nombre: 'Sin lesión aparente' },
    { id: 12, nombre: 'Por determinar' }
  ],
  origenes: [
    { id: 1, nombre: 'Bus articulado' },
    { id: 2, nombre: 'Bus patrón' },
    { id: 3, nombre: 'Bus alimentador' },
    { id: 4, nombre: 'Vehículo particular' },
    { id: 5, nombre: 'Peatón' },
    { id: 6, nombre: 'Infraestructura' },
    { id: 7, nombre: 'Tercero' },
    { id: 8, nombre: 'Causas naturales' },
    { id: 9, nombre: 'Por determinar' }
  ],
  evaluacion_riesgo: [
    { id: 1, nombre: 'Leve' },
    { id: 2, nombre: 'Moderado' },
    { id: 3, nombre: 'Grave' },
    { id: 4, nombre: 'Muy grave' },
    { id: 5, nombre: 'Fatal' }
  ],
  estaciones: [
    { id: 1, nombre: 'Naranjal' },
    { id: 2, nombre: 'Izaguirre' },
    { id: 3, nombre: 'Pacífico' },
    { id: 4, nombre: 'Independencia' },
    { id: 5, nombre: 'Los Jazmines' },
    { id: 6, nombre: 'Tomás Valle' },
    { id: 7, nombre: 'El Milagro' },
    { id: 8, nombre: 'Honorio Delgado' },
    { id: 9, nombre: 'UNI' },
    { id: 10, nombre: 'Parque del Trabajo' },
    { id: 11, nombre: 'Caquetá' },
    { id: 12, nombre: '2 de Mayo' },
    { id: 13, nombre: 'Quilca' },
    { id: 14, nombre: 'España' },
    { id: 15, nombre: 'Central' },
    { id: 16, nombre: 'Colmena' },
    { id: 17, nombre: 'Jirón de la Unión' },
    { id: 18, nombre: 'Estadio Nacional' },
    { id: 19, nombre: 'México' },
    { id: 20, nombre: 'Canadá' },
    { id: 21, nombre: 'Javier Prado' },
    { id: 22, nombre: 'Canaval y Moreyra' },
    { id: 23, nombre: 'Aramburú' },
    { id: 24, nombre: '28 de Julio' },
    { id: 25, nombre: 'Angamos' },
    { id: 26, nombre: 'Ricardo Palma' },
    { id: 27, nombre: 'Benavides' },
    { id: 28, nombre: 'Fernando Terán' },
    { id: 29, nombre: 'Plaza de Flores' },
    { id: 30, nombre: 'Bulevar' },
    { id: 31, nombre: 'Balta' },
    { id: 32, nombre: 'Rosario de Villa' },
    { id: 33, nombre: 'Matellini' }
  ],
  empresas: [
    { id: 1, nombre: 'Lima Bus Internacional 1' },
    { id: 2, nombre: 'Transvial Lima S.A.C.' },
    { id: 3, nombre: 'Perú Masivo S.A.' },
    { id: 4, nombre: 'Lima Vías Express S.A.' },
    { id: 5, nombre: 'Alimentadora del Sur S.A.C.' },
    { id: 6, nombre: 'Alimentadora del Norte S.A.C.' },
    { id: 7, nombre: 'Consorcio Alimentador Centro' },
    { id: 8, nombre: 'Otra empresa' }
  ],
  vehiculos: {
    1: [{ id: 1, nombre: 'A1B-001' }, { id: 2, nombre: 'A1B-002' }, { id: 3, nombre: 'A1B-003' }],
    2: [{ id: 4, nombre: 'B2C-001' }, { id: 5, nombre: 'B2C-002' }, { id: 6, nombre: 'B2C-003' }],
    3: [{ id: 7, nombre: 'C3D-001' }, { id: 8, nombre: 'C3D-002' }],
    4: [{ id: 9, nombre: 'D4E-001' }, { id: 10, nombre: 'D4E-002' }],
    5: [{ id: 11, nombre: 'E5F-001' }, { id: 12, nombre: 'E5F-002' }],
    6: [{ id: 13, nombre: 'F6G-001' }, { id: 14, nombre: 'F6G-002' }]
  },
  conductores: [
    { id: 1, nombre: 'Carlos Mendoza López' },
    { id: 2, nombre: 'Juan Pérez García' },
    { id: 3, nombre: 'Miguel Ángel Torres' },
    { id: 4, nombre: 'Roberto Sánchez Cruz' },
    { id: 5, nombre: 'Fernando Díaz Ramos' },
    { id: 6, nombre: 'Luis Alberto Vargas' }
  ],
  partes_lesion: [
    { id: 1, nombre: 'Cabeza' },
    { id: 2, nombre: 'Rostro' },
    { id: 3, nombre: 'Cuello' },
    { id: 4, nombre: 'Hombro' },
    { id: 5, nombre: 'Brazo' },
    { id: 6, nombre: 'Mano' },
    { id: 7, nombre: 'Tórax' },
    { id: 8, nombre: 'Abdomen' },
    { id: 9, nombre: 'Espalda / Columna' },
    { id: 10, nombre: 'Cadera' },
    { id: 11, nombre: 'Pierna' },
    { id: 12, nombre: 'Rodilla' },
    { id: 13, nombre: 'Tobillo' },
    { id: 14, nombre: 'Pie' },
    { id: 15, nombre: 'Múltiples partes' },
    { id: 16, nombre: 'No aplica' }
  ],
  atencion_medica: [
    { id: 1, nombre: 'Primeros auxilios en campo' },
    { id: 2, nombre: 'Traslado a tópico de estación' },
    { id: 3, nombre: 'Traslado a centro médico' },
    { id: 4, nombre: 'Traslado en ambulancia' },
    { id: 5, nombre: 'Atención por bomberos' },
    { id: 6, nombre: 'No requirió atención' },
    { id: 7, nombre: 'Rechazó atención' }
  ],
  companias_seguro: [
    { id: 1, nombre: 'Rímac Seguros' },
    { id: 2, nombre: 'Pacífico Seguros' },
    { id: 3, nombre: 'MAPFRE' },
    { id: 4, nombre: 'La Positiva' },
    { id: 5, nombre: 'Interseguro' },
    { id: 6, nombre: 'Protecta' },
    { id: 7, nombre: 'Por determinar' },
    { id: 8, nombre: 'Sin seguro' }
  ],
  centros_medicos: [
    { id: 1, nombre: 'Hospital Cayetano Heredia' },
    { id: 2, nombre: 'Hospital Arzobispo Loayza' },
    { id: 3, nombre: 'Hospital Dos de Mayo' },
    { id: 4, nombre: 'Hospital María Auxiliadora' },
    { id: 5, nombre: 'Hospital Rebagliati' },
    { id: 6, nombre: 'Hospital Almenara' },
    { id: 7, nombre: 'Hospital de Emergencias Grau' },
    { id: 8, nombre: 'Hospital Sergio Bernales' },
    { id: 9, nombre: 'Clínica San Pablo' },
    { id: 10, nombre: 'Clínica Internacional' },
    { id: 11, nombre: 'Clínica Ricardo Palma' },
    { id: 12, nombre: 'Centro de Salud más cercano' },
    { id: 13, nombre: 'Tópico de estación' }
  ],
  topicos: [
    { id: 1, nombre: 'Tópico Naranjal' },
    { id: 2, nombre: 'Tópico Central' },
    { id: 3, nombre: 'Tópico Matellini' },
    { id: 4, nombre: 'Tópico Canaval y Moreyra' },
    { id: 5, nombre: 'Tópico Independencia' },
    { id: 6, nombre: 'Sala de primeros auxilios móvil' },
    { id: 7, nombre: 'No aplica' }
  ],
  comisarias: [
    { id: 1, nombre: 'Comisaría de Independencia' },
    { id: 2, nombre: 'Comisaría de Comas' },
    { id: 3, nombre: 'Comisaría de San Martín de Porres' },
    { id: 4, nombre: 'Comisaría de Rímac' },
    { id: 5, nombre: 'Comisaría del Cercado de Lima' },
    { id: 6, nombre: 'Comisaría de Lince' },
    { id: 7, nombre: 'Comisaría de San Isidro' },
    { id: 8, nombre: 'Comisaría de Miraflores' },
    { id: 9, nombre: 'Comisaría de Surquillo' },
    { id: 10, nombre: 'Comisaría de Barranco' },
    { id: 11, nombre: 'Comisaría de Chorrillos' },
    { id: 12, nombre: 'Otra comisaría' }
  ],
  evaluacion_responsabilidad: [
    { id: 1, nombre: 'Responsabilidad del conductor' },
    { id: 2, nombre: 'Responsabilidad del pasajero' },
    { id: 3, nombre: 'Responsabilidad de tercero' },
    { id: 4, nombre: 'Responsabilidad compartida' },
    { id: 5, nombre: 'Caso fortuito / Fuerza mayor' },
    { id: 6, nombre: 'En investigación' },
    { id: 7, nombre: 'Por determinar' }
  ],
  asesores: [
    { id: 1, nombre: 'Ana María Quispe' },
    { id: 2, nombre: 'Jorge Luis Fernández' },
    { id: 3, nombre: 'Patricia Rojas Medina' },
    { id: 4, nombre: 'Ricardo Huamán Silva' },
    { id: 5, nombre: 'Carmen Elena Vásquez' }
  ],
  tipos_documento: [
    { id: 1, nombre: 'DNI' },
    { id: 2, nombre: 'Carnet de Extranjería' },
    { id: 3, nombre: 'Pasaporte' },
    { id: 4, nombre: 'PTP' },
    { id: 5, nombre: 'Menor sin documento' }
  ],
  generos: [
    { id: 1, nombre: 'Masculino' },
    { id: 2, nombre: 'Femenino' },
    { id: 3, nombre: 'No binario' },
    { id: 4, nombre: 'Prefiere no decir' }
  ]
};

export function getCatalogo(catalogo, filtroId = null) {
  const data = CATALOGOS[catalogo];
  if (!data) return [];

  if (filtroId !== null && typeof data === 'object' && !Array.isArray(data)) {
    return data[filtroId] || [];
  }

  return Array.isArray(data) ? data : [];
}

export default CATALOGOS;
