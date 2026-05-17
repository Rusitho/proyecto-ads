import { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid, Button, TextField, Box, LinearProgress, Alert, Chip, Typography, Divider
} from '@mui/material';
import {
  Warning, DirectionsBus,
  Security, Gavel, Save, PersonSearch, ContentPaste, Share, Print, PersonAdd
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import api from '../api/api';
import { guardarIncidenteLocal } from '../api/storage';
import CATALOGOS from '../api/catalogosLocal';
import useCatalogo from '../hooks/useCatalogo';
import SelectField from './SelectField';
import SectionCard from './SectionCard';
import ProgressBar from './ProgressBar';
import ResumenDialog from './ResumenDialog';
import VictimaCard from './VictimaCard';
import { generarCodigoIncidencia, calcularTurno, calcularProgreso, generarResumenTexto } from '../utils/incidenteUtils';

const CAMPOS_PROGRESO = [
  'categoria_id', 'subcategoria_id', 'riesgo_id', 'estacion_id',
  'fecha_evento', 'descripcion', 'empresa_id', 'conductor_id'
];

export default function IncidenteForm() {
  const codigoInicial = useMemo(() => generarCodigoIncidencia(), []);

  const VICTIMA_VACIA = {
    tipo_doc: '', num_doc: '', genero: '', nombres: '',
    apellidos: '', telefono: '', fecha_nacimiento: '', edad: '', rango_edad: '',
    diagnostico: '', tipo_lesion_id: '', parte_lesion_id: '',
    atencion_medica_id: '', centro_medico_id: '', topico_id: '',
    seguro_tipo: '', seguro_numero: '', seguro_hora_activacion: '',
    seguimiento: [], seguimiento_daas: []
  };

  const { control, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      codigo_incidencia: codigoInicial,
      categoria_id: '', subcategoria_id: '', origen_id: '', riesgo_id: '',
      estacion_id: '', empresa_id: '', vehiculo_id: '', conductor_id: '',
      comisaria_id: '', evaluacion_responsabilidad_id: '', asesor_id: '',
      fecha_evento: '', descripcion: '', estado: 'Registrado'
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const [resumenOpen, setResumenOpen] = useState(false);
  const [resumenTexto, setResumenTexto] = useState('');
  const [victimas, setVictimas] = useState([{ ...VICTIMA_VACIA }]);

  const agregarVictima = () => {
    setVictimas(prev => [...prev, { ...VICTIMA_VACIA }]);
    toast.success(`Afectado #${victimas.length + 1} agregado`);
  };

  const eliminarVictima = (index) => {
    setVictimas(prev => prev.filter((_, i) => i !== index));
  };

  const actualizarVictima = (index, data) => {
    setVictimas(prev => prev.map((v, i) => i === index ? data : v));
  };

  const allValues = watch();
  const categoriaId = allValues.categoria_id;
  const empresaId = allValues.empresa_id;
  const fechaEvento = allValues.fecha_evento;

  const turnoAuto = calcularTurno(fechaEvento);
  const progreso = calcularProgreso(allValues, CAMPOS_PROGRESO);

  const { data: categorias, loading: loadCat } = useCatalogo('categorias');
  const { data: subcategorias, loading: loadSub } = useCatalogo('subcategorias', categoriaId || null);
  const { data: tiposLesion } = useCatalogo('tipos_lesion');
  const { data: origenes } = useCatalogo('origenes');
  const { data: riesgos } = useCatalogo('evaluacion_riesgo');
  const { data: estaciones } = useCatalogo('estaciones');
  const { data: empresas } = useCatalogo('empresas');
  const { data: vehiculos, loading: loadVeh } = useCatalogo('vehiculos', empresaId || null);
  const { data: conductores } = useCatalogo('conductores');
  const { data: partesLesion } = useCatalogo('partes_lesion');
  const { data: atencionMedica } = useCatalogo('atencion_medica');
  const { data: centrosMedicos } = useCatalogo('centros_medicos');
  const { data: topicos } = useCatalogo('topicos');
  const { data: companiasSeg } = useCatalogo('companias_seguro');
  const { data: comisarias } = useCatalogo('comisarias');
  const { data: evalResponsabilidad } = useCatalogo('evaluacion_responsabilidad');
  const { data: asesores } = useCatalogo('asesores');
  const { data: tiposDocumento } = useCatalogo('tipos_documento');
  const { data: generos } = useCatalogo('generos');

  useEffect(() => {
    if (categoriaId) setValue('subcategoria_id', '');
  }, [categoriaId, setValue]);

  useEffect(() => {
    if (empresaId) setValue('vehiculo_id', '');
  }, [empresaId, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {};
      Object.entries(data).forEach(([key, val]) => {
        if (val !== '' && val !== null) payload[key] = val;
      });
      const victimasLimpias = victimas.filter(v =>
        v.nombres || v.apellidos || v.num_doc
      );
      if (victimasLimpias.length > 0) {
        payload.afectados = victimasLimpias;
      }

      try {
        const res = await api.post('/incidente', payload);
        toast.success(`Incidente ${data.codigo_incidencia} registrado en servidor`);
      } catch {
        const local = guardarIncidenteLocal(payload);
        toast.success(`Incidente ${data.codigo_incidencia} guardado localmente`);
      }
      reset({
        ...Object.fromEntries(Object.keys(data).map(k => [k, ''])),
        codigo_incidencia: generarCodigoIncidencia(),
        estado: 'Registrado'
      });
      setVictimas([{ ...VICTIMA_VACIA }]);
    } catch (err) {
      toast.error('Error al registrar incidente');
    } finally {
      setSubmitting(false);
    }
  };

  const abrirResumen = () => {
    const txt = generarResumenTexto(allValues, CATALOGOS, victimas);
    setResumenTexto(txt);
    setResumenOpen(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pb: 4 }}>
      {submitting && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      {/* BARRA DE INFORMACIÓN RÁPIDA */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 1.5,
        bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'divider',
        flexWrap: 'wrap'
      }}>
        <Chip
          label={allValues.codigo_incidencia}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: 0.5 }}
        />
        {turnoAuto && (
          <Chip label={turnoAuto} color="info" size="small" variant="outlined" />
        )}
        <Box sx={{ flex: 1, minWidth: 100 }}>
          <ProgressBar value={progreso} />
        </Box>
      </Box>

      {/* SECCION 1: CLASIFICACION */}
      <SectionCard icon={<Warning />} title="Clasificación del Incidente" subtitle="Categoría, tipo y nivel de riesgo">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller name="categoria_id" control={control}
              rules={{ required: 'Seleccione una categoría' }}
              render={({ field }) => (
                <SelectField label="Categoría *" options={categorias} loading={loadCat}
                  value={field.value} onChange={field.onChange}
                  error={!!errors.categoria_id} helperText={errors.categoria_id?.message} />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="subcategoria_id" control={control}
              rules={{ required: 'Seleccione una subcategoría' }}
              render={({ field }) => (
                <SelectField label="Subcategoría *" options={subcategorias} loading={loadSub}
                  value={field.value} onChange={field.onChange}
                  disabled={!categoriaId}
                  error={!!errors.subcategoria_id} helperText={errors.subcategoria_id?.message || (!categoriaId ? 'Seleccione categoría primero' : '')} />
              )} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller name="origen_id" control={control}
              render={({ field }) => (
                <SelectField label="Origen" options={origenes}
                  value={field.value} onChange={field.onChange} />
              )} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller name="riesgo_id" control={control}
              rules={{ required: 'Seleccione nivel de riesgo' }}
              render={({ field }) => (
                <SelectField label="Nivel de Riesgo *" options={riesgos}
                  value={field.value} onChange={field.onChange}
                  error={!!errors.riesgo_id} helperText={errors.riesgo_id?.message} />
              )} />
          </Grid>
        </Grid>
      </SectionCard>

      {/* SECCION 2: UBICACION Y VEHICULO */}
      <SectionCard icon={<DirectionsBus />} title="Ubicación y Vehículo" subtitle="Estación, empresa, unidad y conductor">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller name="estacion_id" control={control}
              rules={{ required: 'Seleccione la estación' }}
              render={({ field }) => (
                <SelectField label="Estación / Paradero *" options={estaciones}
                  value={field.value} onChange={field.onChange}
                  error={!!errors.estacion_id} helperText={errors.estacion_id?.message} />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="empresa_id" control={control}
              render={({ field }) => (
                <SelectField label="Empresa Operadora" options={empresas}
                  value={field.value} onChange={field.onChange} />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="vehiculo_id" control={control}
              render={({ field }) => (
                <SelectField label="Vehículo (Placa)" options={vehiculos} loading={loadVeh}
                  value={field.value} onChange={field.onChange}
                  disabled={!empresaId}
                  helperText={!empresaId ? 'Seleccione empresa primero' : ''} />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="conductor_id" control={control}
              render={({ field }) => (
                <SelectField label="Conductor" options={conductores}
                  value={field.value} onChange={field.onChange} />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="fecha_evento" control={control}
              rules={{ required: 'Ingrese la fecha del evento' }}
              render={({ field }) => (
                <TextField type="datetime-local" label="Fecha y Hora del Evento *"
                  InputLabelProps={{ shrink: true }}
                  value={field.value} onChange={field.onChange}
                  error={!!errors.fecha_evento} helperText={errors.fecha_evento?.message} />
              )} />
          </Grid>
          {turnoAuto && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Turno (automático)"
                value={turnoAuto}
                InputProps={{ readOnly: true }}
                sx={{ '& .MuiInputBase-input': { fontWeight: 600, color: 'primary.main' } }}
              />
            </Grid>
          )}
        </Grid>
      </SectionCard>

      {/* SECCION 3: PERSONAS AFECTADAS (con lesiones y atención médica por persona) */}
      <SectionCard
        icon={<PersonSearch />}
        title={`Personas Afectadas (${victimas.length})`}
        subtitle="Datos de los usuarios o pasajeros involucrados"
        defaultOpen={false}
      >
        {victimas.map((vic, idx) => (
          <VictimaCard
            key={idx}
            index={idx}
            data={vic}
            onChange={actualizarVictima}
            onRemove={eliminarVictima}
            tiposDocumento={tiposDocumento}
            generos={generos}
            tiposLesion={tiposLesion}
            partesLesion={partesLesion}
            atencionMedica={atencionMedica}
            centrosMedicos={centrosMedicos}
            topicos={topicos}
            canRemove={victimas.length > 1}
          />
        ))}
        <Button
          variant="outlined"
          startIcon={<PersonAdd />}
          onClick={agregarVictima}
          fullWidth
          sx={{ mt: 1, borderStyle: 'dashed' }}
        >
          Agregar otro afectado
        </Button>
        {victimas.length > 1 && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            Total: {victimas.length} personas afectadas registradas
          </Typography>
        )}
      </SectionCard>

      {/* SECCION 5: AUTORIDADES */}
      <SectionCard icon={<Security />} title="Autoridades" subtitle="Comisaría interviniente" defaultOpen={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller name="comisaria_id" control={control}
              render={({ field }) => (
                <SelectField label="Comisaría" options={comisarias}
                  value={field.value} onChange={field.onChange} />
              )} />
          </Grid>
        </Grid>
      </SectionCard>

      {/* SECCION 6: EVALUACION Y CIERRE */}
      <SectionCard icon={<Gavel />} title="Evaluación y Cierre" subtitle="Responsabilidad, asesor, observaciones" defaultOpen={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller name="evaluacion_responsabilidad_id" control={control}
              render={({ field }) => (
                <SelectField label="Evaluación de Responsabilidad" options={evalResponsabilidad}
                  value={field.value} onChange={field.onChange} />
              )} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller name="asesor_id" control={control}
              render={({ field }) => (
                <SelectField label="Asesor Asignado" options={asesores}
                  value={field.value} onChange={field.onChange} />
              )} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="descripcion" control={control}
              rules={{ required: 'Describa brevemente el incidente' }}
              render={({ field }) => (
                <TextField label="Descripción del Incidente *" multiline rows={3}
                  value={field.value} onChange={field.onChange}
                  placeholder="Describa qué ocurrió, circunstancias relevantes..."
                  error={!!errors.descripcion} helperText={errors.descripcion?.message} />
              )} />
          </Grid>
        </Grid>
      </SectionCard>

      {/* BOTONES DE ACCION */}
      <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting}
          startIcon={<Save />}
          sx={{ flex: 1, py: 1.5 }}
        >
          {submitting ? 'Registrando...' : 'Registrar Incidente'}
        </Button>
        <Button
          variant="outlined"
          color="info"
          size="large"
          onClick={abrirResumen}
          startIcon={<Share />}
          sx={{ flex: { sm: 0.5 } }}
        >
          Resumen
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => window.print()}
          startIcon={<Print />}
          sx={{ flex: { sm: 0.4 } }}
        >
          Imprimir
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => {
            reset({
              ...Object.fromEntries(Object.keys(allValues).map(k => [k, ''])),
              codigo_incidencia: generarCodigoIncidencia(),
              estado: 'Registrado'
            });
            setVictimas([{ ...VICTIMA_VACIA }]);
          }}
          disabled={submitting}
          sx={{ flex: { sm: 0.35 } }}
        >
          Limpiar
        </Button>
      </Box>

      <Alert severity="info" sx={{ mt: 2 }}>
        Los campos marcados con * son obligatorios. Las secciones cerradas son opcionales y se pueden completar después.
      </Alert>

      <ResumenDialog open={resumenOpen} onClose={() => setResumenOpen(false)} resumen={resumenTexto} />
    </Box>
  );
}
