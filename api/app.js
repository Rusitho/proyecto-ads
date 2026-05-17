require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/catalogos', require('./routes/catalogos.routes'));
app.use('/api/incidente', require('./routes/incidente.routes'));
app.use('/api/usuario', require('./routes/usuario.routes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
