const express = require('express');
const router = express.Router();
const { 
    obtenerProveedores, 
    crearProveedor
 } = require('../controllers/proveedoresController');

router.get('/', obtenerProveedores);
router.post('/', crearProveedor);

module.exports = router;


