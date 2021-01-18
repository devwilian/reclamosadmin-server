const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { upload, recuperarImagen } = require('../controllers/upload.controller');


const router = Router();

router.use(fileUpload());
router.put('/:tipo/:id',upload);
router.get('/:tipo/:idimg',recuperarImagen);

module.exports = router;