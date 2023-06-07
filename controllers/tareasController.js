
const { getFirestoreInstance } = require("../firebase");

const db = getFirestoreInstance();


//const tareasEditCreate = db.collection('tareas');
const tareasCollection = db.collection('tareas').orderBy("fecha", "asc");

// Manejador para la ruta principal
const index = async (req, res) => {
    const tareasSnapshot = await tareasCollection.get();
    const tareas = tareasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('index', { tareas });
};

// Manejador para la ruta de creación de tareas
/*
const create = (req, res) => {
    res.render("create");
};

// Manejador para la creación de una nueva tarea
const createTask = async (req, res) => {
    const { fecha, nombre, descripcion } = req.body;
    const tarea = {
        fecha,
        nombre,
        descripcion,
    };
    await tareasEditCreate.add(tarea);
    res.redirect("/");
};
*/
// Manejador para la ruta de edición de una tarea
/*
const edit = async (req, res) => {
    const tareaId = req.params.id;
    const tareasSnapshot = await tareasEditCreate.doc(tareaId).get();
    const tarea = {
        id: tareasSnapshot.id,
        ...tareasSnapshot.data(),
    };
    res.render("edit", { tarea });
};
*/
/*
// Manejador para la edición de una tarea
const editTask = async (req, res) => {
    const tareaId = req.params.id;
    const { fecha, nombre, descripcion } = req.body;
    const tarea = {
        fecha,
        nombre,
        descripcion,
    };
    await tareasEditCreate.doc(tareaId).update(tarea);
    res.redirect('/');
};

// Manejador para la eliminación de una tarea
const deleteTask = async (req, res) => {
    const tareaId = req.params.id;
    await tareasEditCreate.doc(tareaId).delete();
    res.redirect('/');
};
*/
module.exports = {
    index,
    //create,
    //createTask,
    //edit,
    //editTask,
    //deleteTask
};


