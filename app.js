const { getFirestoreInstance } = require("./firebase");
const db = getFirestoreInstance();

const express = require("express");
const hbs = require("hbs");
const dotenv = require("dotenv");
dotenv.config();

const tareasRoutes = require("./routes/tareasRoutes");
const fotosRoutes = require("./routes/fotosRoutes");
const perrosRoutes = require("./routes/perrosRoutes");
const formulario = require("./routes/formulario");
const buscarRoutes = require('./routes/buscarRoutes');

const app = express();
const port = 3000;

// Configurar el directorio de vistas y el motor de plantilla
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



// Rutas
app.use("/buscar", buscarRoutes);
app.use("/fotos", fotosRoutes);
app.use("/perros", perrosRoutes);
app.use("/formulario", formulario);
app.use("/", tareasRoutes);




//CRUD
/*const tareasEditCreate = db.collection('tareas');

app.get("/tareas/create", (req, res) => {
    res.render("create");
});

app.post("/tareas/create", async (req, res) => {
    const { fecha, nombre, descripcion } = req.body;
    const tarea = {
        fecha,
        nombre,
        descripcion,
    };
    await tareasEditCreate.add(tarea);
    res.redirect("/");
});

app.get("/tareas/edit/:id", async (req, res) => {
    const tareaId = req.params.id;
    const tareasSnapshot = await tareasEditCreate.doc(tareaId).get();
    const tarea = {
        id: tareasSnapshot.id,
        ...tareasSnapshot.data(),
    };
    res.render("edit", { tarea });
});

app.post("/tareas/edit/:id", async (req, res) => {
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

app.get("/tareas/delete/:id", async (req, res) => {
    const tareaId = req.params.id;
    await tareasEditCreate.doc(tareaId).delete();
    res.redirect('/');
});*/





app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:3000");
  });





