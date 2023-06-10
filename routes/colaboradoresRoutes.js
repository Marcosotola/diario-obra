

const express = require("express");
const router = express.Router();
const { getAllColaboradores, createColaborador, getEditColaborador, updateColaborador, deleteColaborador } = require("../controllers/colaboradoresController");

// Obtener todos los colaboradores
router.get("/", getAllColaboradores);

// Agregar un nuevo colaborador
router.post("/", createColaborador);

// Obtener la vista de edición del colaborador
router.get("/:id/edit", getEditColaborador);

// Actualizar un colaborador
router.put("/:id", updateColaborador);

// Editar un colaborador existente
router.post("/:id", updateColaborador);

// Eliminar un colaborador
router.delete("/:id", deleteColaborador);

module.exports = router;
