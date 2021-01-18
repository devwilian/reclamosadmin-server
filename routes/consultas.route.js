const { Router } = require('express');
const { getConsultaGeneral, getDocumentosCollection } = require('../controllers/consultas.controller');

const router = Router();

router.get('/todo/:query',getConsultaGeneral);

module.exports = router;