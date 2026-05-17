import { Grid, TextField, IconButton, Box, Typography, Chip, Divider } from '@mui/material';
import { Delete, Person, LocalHospital, Shield, MonitorHeart, SupportAgent } from '@mui/icons-material';
import SelectField from './SelectField';
import SeguimientoList from './SeguimientoList';
import { calcularEdad, calcularRangoEdad } from '../utils/incidenteUtils';

const RANGOS_EDAD = [
  { id: 1, nombre: 'Infantes (0-5)' },
  { id: 2, nombre: 'Niños (6-11)' },
  { id: 3, nombre: 'Adolescentes (12-17)' },
  { id: 4, nombre: 'Jóvenes (18-29)' },
  { id: 5, nombre: 'Adultos (30-59)' },
  { id: 6, nombre: 'Adultos Mayores (60+)' }
];

const TIPOS_SEGURO = [
  { id: 1, nombre: '1° SOAT' },
  { id: 2, nombre: '2° Accidentes Personales ATU' },
  { id: 3, nombre: '3° Accidentes Personales Concesionario' },
  { id: 4, nombre: '4° Responsabilidad Civil Concesionario' },
  { id: 5, nombre: '5° Accidentes Personales Personal' }
];

const ESTADOS_SEGUIMIENTO = [
  { id: 1, nombre: 'Atendido en campo' },
  { id: 2, nombre: 'En traslado' },
  { id: 3, nombre: 'Ingreso a emergencia' },
  { id: 4, nombre: 'En observación' },
  { id: 5, nombre: 'Internado' },
  { id: 6, nombre: 'En tratamiento' },
  { id: 7, nombre: 'En recuperación' },
  { id: 8, nombre: 'Alta médica' },
  { id: 9, nombre: 'Fallecido' }
];

const TIPOS_CONTACTO_DAAS = [
  { id: 1, nombre: 'Visita presencial' },
  { id: 2, nombre: 'Llamada telefónica' },
  { id: 3, nombre: 'Videollamada' }
];

const CAMPOS_SEGUIMIENTO = [
  { field: 'fecha', label: 'Fecha/Hora', type: 'datetime-local', xs: 12, sm: 6 },
  { field: 'estado', label: 'Estado', type: 'select', options: ESTADOS_SEGUIMIENTO, xs: 12, sm: 6 },
  { field: 'observaciones', label: 'Observaciones', type: 'text', xs: 12, sm: 12, multiline: true, rows: 2, placeholder: 'Detalle del estado actual...' }
];

const CAMPOS_DAAS = [
  { field: 'fecha', label: 'Fecha', type: 'date', xs: 6, sm: 4 },
  { field: 'tipo', label: 'Tipo Contacto', type: 'select', options: TIPOS_CONTACTO_DAAS, xs: 6, sm: 4 },
  { field: 'responsable', label: 'Responsable', type: 'text', xs: 12, sm: 4, placeholder: 'Nombre del asesor' },
  { field: 'observaciones', label: 'Observaciones de recuperación', type: 'text', xs: 12, sm: 12, multiline: true, rows: 2, placeholder: 'Estado de recuperación, evolución...' }
];

export default function VictimaCard({
  index, data, onChange, onRemove, canRemove,
  tiposDocumento, generos,
  tiposLesion, partesLesion, atencionMedica, centrosMedicos, topicos
}) {
  const update = (field, value) => {
    const updated = { ...data, [field]: value };

    if (field === 'fecha_nacimiento' && value) {
      const edad = calcularEdad(value);
      updated.edad = edad !== '' ? String(edad) : '';
      updated.rango_edad = calcularRangoEdad(edad);
    }

    onChange(index, updated);
  };

  return (
    <Box sx={{
      border: '1px solid',
      borderColor: index === 0 ? 'primary.light' : 'divider',
      borderRadius: 1,
      p: 2,
      mb: 2,
      bgcolor: index === 0 ? 'rgba(25, 118, 210, 0.02)' : 'transparent',
      position: 'relative'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
        <Person fontSize="small" color={index === 0 ? 'primary' : 'action'} />
        <Typography variant="subtitle2" fontWeight={600} sx={{ flex: 1 }}>
          {index === 0 ? 'Afectado Principal' : `Afectado #${index + 1}`}
        </Typography>
        {index === 0 && (
          <Chip label="Principal" size="small" color="primary" variant="outlined" />
        )}
        {canRemove && (
          <IconButton size="small" color="error" onClick={() => onRemove(index)} title="Eliminar">
            <Delete fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* DATOS PERSONALES */}
      <Grid container spacing={1.5}>
        <Grid item xs={6} sm={4}>
          <SelectField label="Tipo Doc." options={tiposDocumento}
            value={data.tipo_doc} onChange={(v) => update('tipo_doc', v)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField label="N° Documento" value={data.num_doc} size="small"
            onChange={(e) => update('num_doc', e.target.value)}
            placeholder="72345678"
            inputProps={{ maxLength: 15 }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectField label="Género" options={generos}
            value={data.genero} onChange={(v) => update('genero', v)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Nombres" value={data.nombres} size="small"
            onChange={(e) => update('nombres', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Apellidos" value={data.apellidos} size="small"
            onChange={(e) => update('apellidos', e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField label="Teléfono" value={data.telefono} size="small"
            onChange={(e) => update('telefono', e.target.value)}
            placeholder="987654321"
            inputProps={{ maxLength: 15 }} />
        </Grid>

        {/* FECHA NACIMIENTO + EDAD AUTO */}
        <Grid item xs={12} sm={4}>
          <TextField label="Fecha de Nacimiento" type="date" size="small"
            InputLabelProps={{ shrink: true }}
            value={data.fecha_nacimiento || ''}
            onChange={(e) => update('fecha_nacimiento', e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField label="Edad" value={data.edad} size="small" type="number"
            onChange={(e) => {
              const edad = e.target.value;
              onChange(index, {
                ...data,
                edad,
                rango_edad: calcularRangoEdad(Number(edad))
              });
            }}
            InputProps={{ readOnly: !!data.fecha_nacimiento }}
            helperText={data.fecha_nacimiento ? 'Auto-calculada' : ''}
            inputProps={{ min: 0, max: 120 }} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <SelectField label="Rango de Edad (INEI)" options={RANGOS_EDAD}
            value={data.rango_edad || ''}
            onChange={(v) => update('rango_edad', v)}
            disabled={!!data.edad || !!data.fecha_nacimiento} />
        </Grid>
      </Grid>

      {/* LESIONES Y ATENCION MEDICA */}
      <Divider sx={{ my: 2 }}>
        <Chip icon={<LocalHospital sx={{ fontSize: 16 }} />}
          label="Lesiones y Atención Médica" size="small" variant="outlined" color="error" />
      </Divider>

      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={4}>
          <SelectField label="Tipo de Lesión" options={tiposLesion}
            value={data.tipo_lesion_id || ''} onChange={(v) => update('tipo_lesion_id', v)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectField label="Parte Afectada" options={partesLesion}
            value={data.parte_lesion_id || ''} onChange={(v) => update('parte_lesion_id', v)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Diagnóstico / Lesiones" value={data.diagnostico} size="small"
            onChange={(e) => update('diagnostico', e.target.value)}
            placeholder="Contusión en rodilla..." />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectField label="Atención Médica" options={atencionMedica}
            value={data.atencion_medica_id || ''} onChange={(v) => update('atencion_medica_id', v)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectField label="Centro Médico" options={centrosMedicos}
            value={data.centro_medico_id || ''} onChange={(v) => update('centro_medico_id', v)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectField label="Tópico / Sala" options={topicos}
            value={data.topico_id || ''} onChange={(v) => update('topico_id', v)} />
        </Grid>
      </Grid>

      {/* SEGURO */}
      <Divider sx={{ my: 2 }}>
        <Chip icon={<Shield sx={{ fontSize: 16 }} />}
          label="Seguro Activado" size="small" variant="outlined" color="warning" />
      </Divider>

      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={4}>
          <SelectField label="Tipo de Seguro" options={TIPOS_SEGURO}
            value={data.seguro_tipo || ''} onChange={(v) => update('seguro_tipo', v)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField label="N° Póliza / SOAT" value={data.seguro_numero || ''} size="small"
            onChange={(e) => update('seguro_numero', e.target.value)}
            placeholder="Número de póliza" />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField label="Hora de Activación" type="datetime-local" size="small"
            InputLabelProps={{ shrink: true }}
            value={data.seguro_hora_activacion || ''}
            onChange={(e) => update('seguro_hora_activacion', e.target.value)} />
        </Grid>
      </Grid>

      {/* SEGUIMIENTO MEDICO */}
      <Divider sx={{ my: 2 }} />

      <SeguimientoList
        titulo="Seguimiento Médico (Internamiento → Alta)"
        icon={<MonitorHeart sx={{ fontSize: 18, color: 'error.main' }} />}
        color="error"
        entries={data.seguimiento || []}
        onChange={(entries) => update('seguimiento', entries)}
        campos={CAMPOS_SEGUIMIENTO}
        entradaVacia={{ fecha: '', estado: '', observaciones: '' }}
        chipLabel={{ field: 'estado', options: ESTADOS_SEGUIMIENTO }}
      />

      {/* SEGUIMIENTO DAAS */}
      <SeguimientoList
        titulo="Seguimiento DAAS (Visitas / Llamadas)"
        icon={<SupportAgent sx={{ fontSize: 18, color: 'info.main' }} />}
        color="info"
        entries={data.seguimiento_daas || []}
        onChange={(entries) => update('seguimiento_daas', entries)}
        campos={CAMPOS_DAAS}
        entradaVacia={{ fecha: '', tipo: '', responsable: '', observaciones: '' }}
        chipLabel={{ field: 'tipo', options: TIPOS_CONTACTO_DAAS }}
      />
    </Box>
  );
}
