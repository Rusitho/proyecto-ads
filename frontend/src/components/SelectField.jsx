import { TextField, MenuItem, CircularProgress, InputAdornment } from '@mui/material';

export default function SelectField({ label, options, value, onChange, loading, disabled, error, helperText }) {
  return (
    <TextField
      select
      label={label}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled || loading}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: loading ? (
          <InputAdornment position="end">
            <CircularProgress size={18} />
          </InputAdornment>
        ) : null
      }}
    >
      <MenuItem value="">— Seleccionar —</MenuItem>
      {options.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
}
