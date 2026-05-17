import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, IconButton, Tooltip
} from '@mui/material';
import { ContentCopy, WhatsApp, Download, Close } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function ResumenDialog({ open, onClose, resumen }) {
  const copiar = () => {
    navigator.clipboard.writeText(resumen).then(() => {
      toast.success('Resumen copiado al portapapeles');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = resumen;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast.success('Resumen copiado');
    });
  };

  const compartirWhatsApp = () => {
    const encoded = encodeURIComponent(resumen);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const descargarTXT = () => {
    const blob = new Blob([resumen], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_incidente_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Archivo descargado');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" sx={{ flex: 1 }}>Resumen del Incidente</Typography>
        <IconButton onClick={onClose} size="small"><Close /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: 400,
            overflow: 'auto'
          }}
        >
          {resumen}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1, flexWrap: 'wrap' }}>
        <Tooltip title="Copiar al portapapeles">
          <Button startIcon={<ContentCopy />} onClick={copiar} variant="contained" size="small">
            Copiar
          </Button>
        </Tooltip>
        <Tooltip title="Enviar por WhatsApp">
          <Button startIcon={<WhatsApp />} onClick={compartirWhatsApp} variant="contained" color="success" size="small">
            WhatsApp
          </Button>
        </Tooltip>
        <Tooltip title="Descargar como TXT">
          <Button startIcon={<Download />} onClick={descargarTXT} variant="outlined" size="small">
            Descargar TXT
          </Button>
        </Tooltip>
        <Button onClick={onClose} size="small">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
