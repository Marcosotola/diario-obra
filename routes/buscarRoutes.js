const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/buscarController');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true })); 

router.post('/', tareasController.buscar);

router.get('/', (req, res) => {
    res.render('buscar', { tareas: [] });
});






module.exports = router;




