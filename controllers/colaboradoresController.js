const { getFirestoreInstance } = require("../db/firebase");

const db = getFirestoreInstance();

// Obtener todos los colaboradores
const getAllColaboradores = async (req, res) => {
  try {
    const colaboradoresRef = db.collection("colaboradores");
    const snapshot = await colaboradoresRef.get();
    const colaboradores = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.render("colaboradores", { colaboradores });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un colaborador por ID
const getColaboradorById = async (req, res) => {
  try {
    const { id } = req.params;
    const colaboradorRef = db.collection("colaboradores").doc(id);
    const doc = await colaboradorRef.get();
    if (!doc.exists) {
      return res.status(404).send("Colaborador no encontrado");
    }
    const colaborador = {
      id: doc.id,
      ...doc.data(),
    };
    res.render("colaborador", { colaborador });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo colaborador
const createColaborador = async (req, res) => {
  try {
    const { nombre, cargo } = req.body;
    const colaborador = {
      nombre,
      cargo,
    };
    const newColaboradorRef = await db
      .collection("colaboradores")
      .add(colaborador);
    res.redirect("/colaboradores");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un colaborador
const updateColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cargo } = req.body;
    const colaboradorRef = db.collection("colaboradores").doc(id);
    await colaboradorRef.update({ nombre, cargo });
    res.redirect("/colaboradores");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un colaborador
const deleteColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("colaboradores").doc(id).delete();
    res.redirect("/colaboradores");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllColaboradores,
  getColaboradorById,
  createColaborador,
  updateColaborador,
  deleteColaborador,
};
