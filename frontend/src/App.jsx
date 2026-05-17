import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistroIncidente from './pages/RegistroIncidente';
import ListaIncidentes from './pages/ListaIncidentes';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<RegistroIncidente />} />
        <Route path="/lista" element={<ListaIncidentes />} />
      </Routes>
    </BrowserRouter>
  );
}
