const express = require("express");
const hbs = require("hbs");
const axios = require("axios");
require("dotenv").config();
const admin = require("firebase-admin");


const serviceAccount = require("./firebase.json"); // el archivo de credenciales de firebase
const port = 3000;


const app = express();

app.use(express.static("public"));


//Configurar el directorio de vistas y el motor de plantilla
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();
const tareasCollection = db.collection('tareas').orderBy("fecha", "asc");
const tareasEditCreate = db.collection('tareas');
const fotosCollection = db.collection('fotos');

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', async (req, res) => {

    const tareasSnapshot = await tareasCollection.get();
    const tareas = tareasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('index', { tareas });
});

app.get('/fotos', async (req, res) => {
    const fotosSnapshot = await fotosCollection.get();
    const fotos = fotosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('fotos', { fotos });
});

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
});


app.get("/personas", (req, res) => {
    res.render("personas", {
    });
});


//desde acá
const obtenerPersonas = async() => {
    try {
        const respuesta = await axios.get('https://console.firebase.google.com/u/0/project/diario-obra/database/diario-obra-default-rtdb/data/~2Fpersonas?hl=es-419')
        console.log(respuesta);
    } catch(error){
        console.log(error);
}
}

obtenerPersonas();
/*
// Endpoints para mostrar formulario
app.get("/", (req, res) => {
    res.render("index", {
        title: "Diario de Obra",
    });
    });

    // Endpoint para obtener informacion de un repositorio
    app.get("/repositories", async (req, res) => {
    try {
        const owner = req.query.owner;
        const repo = req.query.repo;
        const url = `https://api.github.com/repos/${owner}/${repo}`;

        //Agregar el token de autenticacion en el encabezado de la solicitud
        const token = process.env.GITHUB_TOKEN;
        const headers = {
        Authorization: `Bearer ${token}`,
        };

        //Realizar la solicitud a la API de GitHUb
        const response = await axios.get(url, { headers });

        //Renderizar la vista de detalla del repositorio
        res.render("repository", {
        title: "Detalle del repositorio",
        repository: response.data,
        });
    } catch (error) {
        // Manejar cualquier error de la solicitud
        res.render("error", {
        title: "Error",
        message: "Error al obtener información del respositorio",
        });
    }
    });

*/
//hasta acá

app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:3000 ");
});