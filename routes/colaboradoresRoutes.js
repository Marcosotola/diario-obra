const express = require("express");
const router = express.Router();
const { getAllColaboradores, createColaborador, updateColaborador, deleteColaborador } = require("../controllers/colaboradoresController");

// Obtener todos los colaboradores
router.get("/", getAllColaboradores);

// Agregar un nuevo colaborador
router.post("/", createColaborador);

// Editar un colaborador existente
router.put("/:id", updateColaborador);

// Eliminar un colaborador
router.delete("/:id", deleteColaborador);

module.exports = router;
