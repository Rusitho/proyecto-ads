export function generarCodigoIncidencia() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `INC-${y}${m}${d}-${seq}`;
}

export function calcularTurno(horaStr) {
  if (!horaStr) return '';
  const h = parseInt(horaStr.split('T').pop()?.split(':')[0] || horaStr.split(':')[0]);
  if (isNaN(h)) return '';
  if (h >= 5 && h < 13) return 'Turno 1 (Mañana)';
  if (h >= 13 && h < 21) return 'Turno 2 (Tarde)';
  return 'Turno 3 (Noche)';
}

export function calcularEdad(fechaNac) {
  if (!fechaNac) return '';
  const hoy = new Date();
  const nac = new Date(fechaNac);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad >= 0 ? edad : '';
}

export function calcularRangoEdad(edad) {
  if (edad === '' || edad === null || edad === undefined || isNaN(edad)) return '';
  const e = Number(edad);
  if (e <= 5) return 1;
  if (e <= 11) return 2;
  if (e <= 17) return 3;
  if (e <= 29) return 4;
  if (e <= 59) return 5;
  return 6;
}

export function calcularProgreso(values, camposRequeridos) {
  let llenos = 0;
  camposRequeridos.forEach(campo => {
    if (values[campo] && values[campo] !== '') llenos++;
  });
  return Math.round((llenos / camposRequeridos.length) * 100);
}

export function generarResumenTexto(data, catalogos, victimas = []) {
  const resolver = (catalogo, id) => {
    if (!id) return '—';
    const lista = catalogo === 'subcategorias'
      ? catalogos.subcategorias?.[data.categoria_id] || []
      : catalogos[catalogo];
    if (!lista || !Array.isArray(lista)) return '—';
    const item = lista.find(i => i.id === Number(id));
    return item ? item.nombre : '—';
  };

  const fecha = data.fecha_evento
    ? new Date(data.fecha_evento).toLocaleString('es-PE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    : '—';

  const turno = calcularTurno(data.fecha_evento);

  let txt = '';
  txt += '📋 REPORTE DE INCIDENTE — ATU COSAC I\n';
  txt += '═'.repeat(45) + '\n\n';

  txt += `🔑 Código: ${data.codigo_incidencia || '—'}\n`;
  txt += `📅 Fecha/Hora: ${fecha}\n`;
  txt += `🕐 Turno: ${turno}\n`;
  txt += `🚌 Estación: ${resolver('estaciones', data.estacion_id)}\n`;
  txt += `🏢 Empresa: ${resolver('empresas', data.empresa_id)}\n\n`;

  txt += '⚠️ CLASIFICACIÓN\n';
  txt += '─'.repeat(45) + '\n';
  txt += `• Categoría: ${resolver('categorias', data.categoria_id)}\n`;
  txt += `• Subcategoría: ${resolver('subcategorias', data.subcategoria_id)}\n`;
  txt += `• Origen: ${resolver('origenes', data.origen_id)}\n`;
  txt += `• Riesgo: ${resolver('evaluacion_riesgo', data.riesgo_id)}\n\n`;

  txt += '🚌 VEHÍCULO\n';
  txt += '─'.repeat(45) + '\n';
  const vehiculos = catalogos.vehiculos?.[data.empresa_id] || [];
  const vehiculo = vehiculos.find(v => v.id === Number(data.vehiculo_id));
  txt += `• Placa: ${vehiculo ? vehiculo.nombre : '—'}\n`;
  txt += `• Conductor: ${resolver('conductores', data.conductor_id)}\n\n`;

  const victimasConDatos = victimas.filter(v => v.nombres || v.apellidos || v.num_doc);
  if (victimasConDatos.length > 0) {
    txt += `👤 PERSONAS AFECTADAS (${victimasConDatos.length})\n`;
    txt += '─'.repeat(45) + '\n';
    victimasConDatos.forEach((v, i) => {
      const nombre = [v.nombres, v.apellidos].filter(Boolean).join(' ');
      txt += `\n  ${i === 0 ? '★' : '•'} Afectado #${i + 1}${i === 0 ? ' (Principal)' : ''}\n`;
      if (nombre) txt += `    Nombre: ${nombre}\n`;
      if (v.num_doc) {
        const tipoDoc = resolver('tipos_documento', v.tipo_doc);
        txt += `    ${tipoDoc}: ${v.num_doc}\n`;
      }
      if (v.genero) txt += `    Género: ${resolver('generos', v.genero)}\n`;
      if (v.edad) txt += `    Edad: ${v.edad} años\n`;
      if (v.rango_edad) {
        const rangos = { 1: 'Infantes (0-5)', 2: 'Niños (6-11)', 3: 'Adolescentes (12-17)', 4: 'Jóvenes (18-29)', 5: 'Adultos (30-59)', 6: 'Adultos Mayores (60+)' };
        txt += `    Rango INEI: ${rangos[v.rango_edad] || v.rango_edad}\n`;
      }
      if (v.telefono) txt += `    Teléfono: ${v.telefono}\n`;
      if (v.tipo_lesion_id || v.parte_lesion_id || v.diagnostico) {
        txt += `    --- Lesiones ---\n`;
        if (v.tipo_lesion_id) txt += `    Tipo Lesión: ${resolver('tipos_lesion', v.tipo_lesion_id)}\n`;
        if (v.parte_lesion_id) txt += `    Parte afectada: ${resolver('partes_lesion', v.parte_lesion_id)}\n`;
        if (v.diagnostico) txt += `    Diagnóstico: ${v.diagnostico}\n`;
      }
      if (v.atencion_medica_id || v.centro_medico_id || v.topico_id) {
        txt += `    --- Atención Médica ---\n`;
        if (v.atencion_medica_id) txt += `    Atención: ${resolver('atencion_medica', v.atencion_medica_id)}\n`;
        if (v.centro_medico_id) txt += `    Centro: ${resolver('centros_medicos', v.centro_medico_id)}\n`;
        if (v.topico_id) txt += `    Tópico: ${resolver('topicos', v.topico_id)}\n`;
      }
      if (v.seguro_tipo) {
        const seguros = { 1: '1° SOAT', 2: '2° Acc. Personales ATU', 3: '3° Acc. Personales Concesionario', 4: '4° Resp. Civil Concesionario', 5: '5° Acc. Personales Personal' };
        txt += `    --- Seguro ---\n`;
        txt += `    Tipo: ${seguros[v.seguro_tipo] || v.seguro_tipo}\n`;
        if (v.seguro_numero) txt += `    Póliza: ${v.seguro_numero}\n`;
        if (v.seguro_hora_activacion) txt += `    Activación: ${new Date(v.seguro_hora_activacion).toLocaleString('es-PE')}\n`;
      }
      if (v.seguimiento && v.seguimiento.length > 0) {
        const estados = { 1: 'Atendido en campo', 2: 'En traslado', 3: 'Ingreso a emergencia', 4: 'En observación', 5: 'Internado', 6: 'En tratamiento', 7: 'En recuperación', 8: 'Alta médica', 9: 'Fallecido' };
        txt += `    --- Seguimiento Médico (${v.seguimiento.length}) ---\n`;
        v.seguimiento.forEach((s, j) => {
          const fecha = s.fecha ? new Date(s.fecha).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
          txt += `    ${j + 1}. ${fecha} | ${estados[s.estado] || '—'} | ${s.observaciones || ''}\n`;
        });
      }
      if (v.seguimiento_daas && v.seguimiento_daas.length > 0) {
        const tiposC = { 1: 'Visita', 2: 'Llamada', 3: 'Videollamada' };
        txt += `    --- Seguimiento DAAS (${v.seguimiento_daas.length}) ---\n`;
        v.seguimiento_daas.forEach((d, j) => {
          const fecha = d.fecha ? new Date(d.fecha + 'T00:00:00').toLocaleDateString('es-PE') : '';
          txt += `    ${j + 1}. ${fecha} | ${tiposC[d.tipo] || '—'} | ${d.responsable || '—'} | ${d.observaciones || ''}\n`;
        });
      }
    });
    txt += '\n';
  }

  if (data.comisaria_id) {
    txt += '🏛️ AUTORIDADES\n';
    txt += '─'.repeat(45) + '\n';
    txt += `• Comisaría: ${resolver('comisarias', data.comisaria_id)}\n`;
    txt += '\n';
  }

  if (data.descripcion) {
    txt += '📝 DESCRIPCIÓN\n';
    txt += '─'.repeat(45) + '\n';
    txt += data.descripcion + '\n\n';
  }

  txt += '─'.repeat(45) + '\n';
  txt += `✅ Estado: ${data.estado || 'Registrado'}\n`;
  if (data.evaluacion_responsabilidad_id) {
    txt += `⚖️ Responsabilidad: ${resolver('evaluacion_responsabilidad', data.evaluacion_responsabilidad_id)}\n`;
  }
  if (data.asesor_id) {
    txt += `👔 Asesor: ${resolver('asesores', data.asesor_id)}\n`;
  }

  txt += '\n' + '═'.repeat(45) + '\n';
  txt += '📌 Generado: ' + new Date().toLocaleString('es-PE') + '\n';

  return txt;
}
