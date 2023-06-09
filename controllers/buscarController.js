
const { getFirestoreInstance } = require("../firebase");
const db = getFirestoreInstance();


const tareasEditCreate = db.collection('tareas');

// Manejador para la ruta principal
const buscar = async (req, res) => {
    const nombre = req.body.nombre; // Obtener el valor del campo de búsqueda

    if (!nombre) {
        // Si el campo de búsqueda está vacío, redirige o muestra un mensaje de error
        res.redirect('/buscar');
        return;
    }

    const tareasSnapshot = await tareasEditCreate.get();
    const tareas = tareasSnapshot.docs
        .map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        .filter(tarea => tarea.nombre.toLowerCase().includes(nombre.toLowerCase())); // Filtrar las tareas por nombre

    res.render('buscar', { tareas });
};

module.exports = {
    buscar
};
