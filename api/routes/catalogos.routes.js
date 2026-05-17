const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/catalogos.controller');

router.get('/', ctrl.getCatalogosDisponibles);
router.get('/:catalogo', ctrl.getCatalogo);
router.get('/:catalogo/:parentId', ctrl.getCatalogoFiltrado);

module.exports = router;
