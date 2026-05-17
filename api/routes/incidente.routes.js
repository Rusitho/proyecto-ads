const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/incidente.controller');

router.post('/', ctrl.crear);
router.get('/', ctrl.listar);

module.exports = router;
