import { Box, LinearProgress, Typography } from '@mui/material';

export default function ProgressBar({ value }) {
  const color = value < 40 ? 'error' : value < 75 ? 'warning' : 'success';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
      <Box sx={{ flex: 1, minWidth: 80 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          color={color}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>
      <Typography variant="caption" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
        {value}%
      </Typography>
    </Box>
  );
}
