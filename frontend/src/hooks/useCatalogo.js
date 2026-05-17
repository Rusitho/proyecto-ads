import { useEffect, useState } from 'react';
import api from '../api/api';
import { getCatalogo } from '../api/catalogosLocal';

export default function useCatalogo(catalogo, filtroId = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!catalogo) return;
    if (filtroId === null && ['subcategorias', 'vehiculos'].includes(catalogo)) {
      setData([]);
      return;
    }

    setLoading(true);
    const url = filtroId ? `/catalogos/${catalogo}/${filtroId}` : `/catalogos/${catalogo}`;

    api.get(url)
      .then(r => setData(r.data))
      .catch(() => {
        setData(getCatalogo(catalogo, filtroId));
      })
      .finally(() => setLoading(false));
  }, [catalogo, filtroId]);

  return { data, loading };
}
