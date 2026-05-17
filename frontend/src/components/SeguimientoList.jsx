import { useState } from 'react';
import {
  Box, Grid, TextField, IconButton, Typography, Chip, Collapse, Button
} from '@mui/material';
import { Add, Delete, ExpandMore, ExpandLess, Edit, Check } from '@mui/icons-material';
import SelectField from './SelectField';

export default function SeguimientoList({
  titulo, icon, color = 'info', entries, onChange,
  campos, entradaVacia, chipLabel
}) {
  const [open, setOpen] = useState(entries.length > 0);
  const [editIdx, setEditIdx] = useState(null);

  const agregar = () => {
    const nueva = { ...entradaVacia, fecha: new Date().toISOString().slice(0, 16) };
    onChange([...entries, nueva]);
    setEditIdx(entries.length);
    setOpen(true);
  };

  const actualizar = (idx, field, value) => {
    const updated = entries.map((e, i) => i === idx ? { ...e, [field]: value } : e);
    onChange(updated);
  };

  const eliminar = (idx) => {
    onChange(entries.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(null);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer',
          py: 0.5, px: 1, borderRadius: 1,
          '&:hover': { bgcolor: 'action.hover' }
        }}
      >
        {icon}
        <Typography variant="caption" fontWeight={700} sx={{ flex: 1 }}>
          {titulo}
        </Typography>
        {entries.length > 0 && (
          <Chip label={entries.length} size="small" color={color} sx={{ height: 20, fontSize: '0.7rem' }} />
        )}
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </Box>

      <Collapse in={open}>
        <Box sx={{ pl: 1, pr: 0.5, pt: 1 }}>
          {entries.length === 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontStyle: 'italic' }}>
              Sin registros. Agregue el primero.
            </Typography>
          )}

          {entries.map((entry, idx) => {
            const isEditing = editIdx === idx;
            return (
              <Box key={idx} sx={{
                mb: 1, p: 1.5, borderRadius: 1,
                border: '1px solid',
                borderColor: isEditing ? `${color}.main` : 'divider',
                bgcolor: isEditing ? `${color}.50` : 'grey.50',
                transition: 'all 0.2s'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
                  <Chip
                    label={`#${idx + 1}`}
                    size="small"
                    color={color}
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                  {chipLabel && entry[chipLabel.field] && (
                    <Chip
                      label={
                        chipLabel.options
                          ? chipLabel.options.find(o => o.id === entry[chipLabel.field])?.nombre || entry[chipLabel.field]
                          : entry[chipLabel.field]
                      }
                      size="small"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  )}
                  <Box sx={{ flex: 1 }} />
                  <IconButton size="small" onClick={() => setEditIdx(isEditing ? null : idx)} title={isEditing ? 'Cerrar' : 'Editar'}>
                    {isEditing ? <Check fontSize="small" color={color} /> : <Edit fontSize="small" />}
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => eliminar(idx)} title="Eliminar">
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>

                {isEditing ? (
                  <Grid container spacing={1}>
                    {campos.map((campo) => (
                      <Grid item xs={campo.xs || 12} sm={campo.sm || 6} key={campo.field}>
                        {campo.type === 'select' ? (
                          <SelectField
                            label={campo.label}
                            options={campo.options}
                            value={entry[campo.field] || ''}
                            onChange={(v) => actualizar(idx, campo.field, v)}
                          />
                        ) : (
                          <TextField
                            label={campo.label}
                            type={campo.type || 'text'}
                            size="small"
                            value={entry[campo.field] || ''}
                            onChange={(e) => actualizar(idx, campo.field, e.target.value)}
                            InputLabelProps={campo.type === 'datetime-local' || campo.type === 'date' ? { shrink: true } : undefined}
                            multiline={campo.multiline}
                            rows={campo.rows}
                            placeholder={campo.placeholder}
                            fullWidth
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, fontSize: '0.75rem' }}>
                    {campos.map((campo) => {
                      let val = entry[campo.field];
                      if (!val) return null;
                      if (campo.type === 'select' && campo.options) {
                        val = campo.options.find(o => o.id === val)?.nombre || val;
                      }
                      if (campo.type === 'datetime-local' && val) {
                        val = new Date(val).toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                      }
                      if (campo.type === 'date' && val) {
                        val = new Date(val + 'T00:00:00').toLocaleDateString('es-PE');
                      }
                      return (
                        <Typography key={campo.field} variant="caption" color="text.secondary">
                          <strong>{campo.label}:</strong> {val}
                        </Typography>
                      );
                    }).filter(Boolean)}
                  </Box>
                )}
              </Box>
            );
          })}

          <Button
            size="small"
            startIcon={<Add />}
            onClick={agregar}
            sx={{ mt: 0.5, borderStyle: 'dashed', textTransform: 'none' }}
            variant="outlined"
            color={color}
            fullWidth
          >
            Agregar registro
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}
