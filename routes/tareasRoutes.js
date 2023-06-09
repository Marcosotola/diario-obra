const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.use('/tareas', tareasController.router); 

router.get('/', tareasController.index);

module.exports = router;