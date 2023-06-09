const { getFirestoreInstance } = require("./db/firebase");
const db = getFirestoreInstance();

const express = require("express");
const hbs = require("hbs");
const dotenv = require("dotenv");
dotenv.config();

const tareasRoutes = require("./routes/tareasRoutes");
const fotosRoutes = require("./routes/fotosRoutes");
const perrosRoutes = require("./routes/perrosRoutes");
const contactoRoutes = require("./routes/contactoRoutes");
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
app.use("/formulario", contactoRoutes);
app.use("/", tareasRoutes);


app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:3000");
  });





