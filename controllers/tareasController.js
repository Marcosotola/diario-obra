const { getFirestoreInstance } = require("../db/firebase");
const db = getFirestoreInstance();
const express = require('express');
const router = express.Router();

const tareasCollection = db.collection('tareas').orderBy("fecha", "asc");

const index = async (req, res) => {
    const tareasSnapshot = await tareasCollection.get();
    const tareas = tareasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('index', { tareas });
};

const tareasEditCreate = db.collection('tareas');

router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/create", async (req, res) => {
    const { fecha, nombre, descripcion } = req.body;
    const tarea = {
        fecha,
        nombre,
        descripcion,
    };
    await tareasEditCreate.add(tarea);
    res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
    const tareaId = req.params.id;
    const tareasSnapshot = await tareasEditCreate.doc(tareaId).get();
    const tarea = {
        id: tareasSnapshot.id,
        ...tareasSnapshot.data(),
    };
    res.render("edit", { tarea });
});

router.post("/edit/:id", async (req, res) => {
    const tareaId = req.params.id;
    const { fecha, nombre, descripcion } = req.body;
    const tarea = {
        fecha,
        nombre,
        descripcion,
    };
    await tareasEditCreate.doc(tareaId).update(tarea);
    res.redirect('/');
});

router.get("/delete/:id", async (req, res) => {
    const tareaId = req.params.id;
    await tareasEditCreate.doc(tareaId).delete();
    res.redirect('/');
});

module.exports = {
    index,
    router
};




