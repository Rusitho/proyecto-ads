import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import App from './App';

const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#ff8f00' },
    background: { default: '#f5f7fa' }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 10 },
  components: {
    MuiTextField: {
      defaultProps: { size: 'small', fullWidth: true }
    },
    MuiButton: {
      styleOverrides: {
        root: { padding: '10px 24px', fontSize: '0.95rem' }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
