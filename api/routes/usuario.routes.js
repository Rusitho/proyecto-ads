const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuario.controller');

router.get('/buscar/:numero', ctrl.buscarPorDocumento);
router.post('/', ctrl.crear);
router.post('/vincular', ctrl.vincularIncidente);

module.exports = router;
