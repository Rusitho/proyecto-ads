import { AppBar, Toolbar, Typography, Container, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { ReportProblem, ListAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import IncidenteForm from '../components/IncidenteForm';

export default function RegistroIncidente() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar sx={{ minHeight: { xs: 56 } }}>
          <ReportProblem sx={{ mr: 1.5 }} />
          <Typography variant="h6" sx={{ flex: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Registro de Incidentes
          </Typography>
          <Tooltip title="Ver listado">
            <IconButton color="inherit" onClick={() => navigate('/lista')} sx={{ mr: 1 }}>
              <ListAlt />
            </IconButton>
          </Tooltip>
          <Chip label="v2.0" size="small" color="secondary" variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Complete los datos del incidente. Los campos obligatorios están marcados con *.
            Las secciones cerradas son opcionales.
          </Typography>
        </Box>
        <IncidenteForm />
      </Container>
    </Box>
  );
}
