
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

const app = express();
const port = 3000;

// Configurar el directorio de vistas y el motor de plantilla
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Rutas
app.use("/", tareasRoutes);
app.use("/fotos", fotosRoutes);
app.use("/perros", perrosRoutes);
app.use('/formulario', formulario);



//CRUD

const tareasEditCreate = db.collection('tareas');
const tareasCollection = db.collection('tareas').orderBy("fecha", "asc");



app.get('/', async (req, res) => {

    const tareasSnapshot = await tareasCollection.get();
    const tareas = tareasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('index', { tareas });
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




app.listen(port, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});













//EL CODIGO SIGUIENTE FUNCIONA SIN CONTROLLERS NI ROUTES
/*

const express = require("express");
const hbs = require("hbs");
//const router = require ('./router/forMail')
const axios = require("axios");
require("dotenv").config();
const admin = require("firebase-admin");


const serviceAccount = require("./firebase.json"); // el archivo de credenciales de firebase
const port = 3000;


const app = express();




//Configurar el directorio de vistas y el motor de plantilla
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const tareasEditCreate = db.collection('tareas');
const tareasCollection = db.collection('tareas').orderBy("fecha", "asc");
const fotosCollection = db.collection('fotos');



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

app.get('/fotos', async (req, res) => {
    const fotosSnapshot = await fotosCollection.get();
    const fotos = fotosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.render('fotos', { fotos });
});


// Middleware para imprimir la URL de la imagen de perro en la consola
const logUrlMiddleware = async (req, res, next) => {
  try {
    const respuesta = await axios.get('https://random.dog/woof.json');
    const urlPerro = respuesta.data.url;
    //console.log(urlPerro); // Imprimir URL en la consola
    req.urlPerro = urlPerro; // Agregar URL a la solicitud
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Ruta para mostrar la página de perros
app.get('/perros', logUrlMiddleware, (req, res) => {
  const urlPerro = req.urlPerro;

  res.render('perros', { url: urlPerro });
});


app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:3000 ");
});


*/