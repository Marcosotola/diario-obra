const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.get('/', (req, res) => {
    res.render('contacto');
});

router.post('/enviar', contactoController.enviarContacto);

module.exports = router;



