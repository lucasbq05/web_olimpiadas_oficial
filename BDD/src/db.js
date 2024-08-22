
const mongoose = require('mongoose');
usuario = "lucasbequis84";
contra = "13579hola";
bd = "Telefonica";

console.log(`Usuario BD: ${usuario}, contraseña: ${contra}`);

//const MONGODB_URI = `mongodb+srv://${usuario}:${contra}@cluster0.v86wlk7.mongodb.net/${bd}?retryWrites=true&w=majority&appName=Cluster0`;
const MONGODB_URI = `mongodb+srv://${usuario}:${contra}@cluster0.xrwgsj3.mongodb.net/${bd}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(MONGODB_URI)
.then(db => console.log("Base de datos Conectada"))
.catch(err => console.log(err))