import { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress, Alert, Tooltip
} from '@mui/material';
import { List, Add, Refresh, ContentCopy } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/api';
import { obtenerIncidentesLocales } from '../api/storage';
import CATALOGOS from '../api/catalogosLocal';

const RIESGO_COLOR = {
  'Leve': 'success',
  'Moderado': 'warning',
  'Grave': 'error',
  'Muy grave': 'error',
  'Fatal': 'error'
};

function resolverNombre(catalogo, id) {
  const lista = CATALOGOS[catalogo];
  if (!lista || !Array.isArray(lista)) return null;
  const item = lista.find(i => i.id === Number(id));
  return item ? item.nombre : null;
}

export default function ListaIncidentes() {
  const [incidentes, setIncidentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fuente, setFuente] = useState('');
  const navigate = useNavigate();

  const cargar = () => {
    setLoading(true);
    api.get('/incidente')
      .then(r => {
        setIncidentes(r.data);
        setFuente('servidor');
      })
      .catch(() => {
        const locales = obtenerIncidentesLocales().map(inc => ({
          ...inc,
          categoria: resolverNombre('categorias', inc.categoria_id),
          estacion: resolverNombre('estaciones', inc.estacion_id),
          riesgo: resolverNombre('evaluacion_riesgo', inc.riesgo_id),
          subcategoria: (() => {
            const subs = CATALOGOS.subcategorias[inc.categoria_id];
            if (!subs) return null;
            const s = subs.find(s => s.id === Number(inc.subcategoria_id));
            return s ? s.nombre : null;
          })()
        }));
        setIncidentes(locales);
        setFuente('local');
      })
      .finally(() => setLoading(false));
  };

  useEffect(cargar, []);

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const copiarFila = (inc) => {
    const linea = [
      inc.codigo_incidencia || `#${inc.incidente_id}`,
      formatFecha(inc.fecha_evento || inc.fecha_registro),
      inc.categoria || '',
      inc.estacion || '',
      inc.riesgo || ''
    ].join(' | ');
    navigator.clipboard.writeText(linea).then(() => toast.success('Copiado'));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar sx={{ minHeight: { xs: 56 } }}>
          <List sx={{ mr: 1.5 }} />
          <Typography variant="h6" sx={{ flex: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Incidentes Registrados
          </Typography>
          {incidentes.length > 0 && (
            <Chip label={`${incidentes.length} registros`} size="small"
              sx={{ mr: 1, color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
              variant="outlined" />
          )}
          <IconButton color="inherit" onClick={cargar} sx={{ mr: 1 }}>
            <Refresh />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/')}>
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
        {fuente === 'local' && incidentes.length > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Mostrando datos guardados localmente. Los registros se sincronizarán cuando el servidor esté disponible.
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && incidentes.length === 0 && (
          <Alert severity="info">No hay incidentes registrados aún.</Alert>
        )}

        {!loading && incidentes.length > 0 && (
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Código</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Categoría</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>Subcategoría</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Estación</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Riesgo</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: 40 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidentes.map((inc, idx) => (
                  <TableRow key={inc.incidente_id || idx} hover>
                    <TableCell>
                      <Typography variant="caption" fontFamily="monospace" fontWeight={700} color="primary">
                        {inc.codigo_incidencia || `#${inc.incidente_id}`}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {formatFecha(inc.fecha_evento || inc.fecha_registro)}
                    </TableCell>
                    <TableCell>{inc.categoria || '—'}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {inc.subcategoria || '—'}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {inc.estacion || '—'}
                    </TableCell>
                    <TableCell>
                      {inc.riesgo ? (
                        <Chip label={inc.riesgo} size="small"
                          color={RIESGO_COLOR[inc.riesgo] || 'default'} />
                      ) : '—'}
                    </TableCell>
                    <TableCell>
                      <Chip label={inc.estado || 'Registrado'} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Copiar datos">
                        <IconButton size="small" onClick={() => copiarFila(inc)}>
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}
