import { Card, CardContent, Typography, Box, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useState } from 'react';

export default function SectionCard({ icon, title, subtitle, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.light' }
      }}
    >
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          cursor: 'pointer',
          bgcolor: open ? 'primary.50' : 'transparent',
          borderBottom: open ? '1px solid' : 'none',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ mr: 1.5, color: 'primary.main', display: 'flex' }}>{icon}</Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
        <IconButton size="small">
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <CardContent sx={{ pt: 2 }}>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  );
}
