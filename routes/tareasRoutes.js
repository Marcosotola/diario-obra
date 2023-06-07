

const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.get('/', tareasController.index);
router.get('/create', tareasController.create);
router.post('/create', tareasController.createTask);
router.get('/edit/:id', tareasController.edit);
router.post('/edit/:id', tareasController.editTask);
router.get('/delete/:id', tareasController.deleteTask);

module.exports = router;
